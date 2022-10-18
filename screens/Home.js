import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { Component, useState, useEffect, useCallback } from "react";
import {
  Entypo,
  FontAwesome,
  Octicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useLogin } from "../context/LoginProvider";
import fondo from "../assets/fondos/fondo.png";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import ModalAddIngreso from "../components/login/modalAddIngreso";
import ModalAddGastos from "../components/modalAddGasto";
import { useFocusEffect } from "@react-navigation/core";
import ListGastos from "../components/ListGastos";
import { authentication, db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
//import firebase from "../dataBase/firebase";

const colectionUsers = "users";
const nameCollection = "collectionGastos";
const nameCollectionUmbral = "collectionIngresos";
export default Home = (props) => {
  const { navigation } = props;
  const { Email_, isLogIn, setIsLogIn, ingresos, setProfile, setUmbral_ } =
    useLogin();
  const [loading, setLoading] = useState(false);
  const [showModalIngreso, setShowModalIngreso] = useState(false);
  const [showModalAddGasto, setShowModalAddGasto] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [msj, setMsj] = useState("Cargando información ... ");

  useEffect(() => {
    updateCurrentUser(authentication.currentUser.uid, setProfile);
    traerData();
    traerUmbral();
  }, []);
  useFocusEffect(useCallback(() => {}, []));

  const traerData = async () => {
    setLoading(true);
    const fotosRef = collection(db, nameCollection);
    const q = query(fotosRef, orderBy("fecha", "desc"), limit(10));
    const newGastos = [];
    /* pRUEBA  */
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { idUser, fecha, fechaCorta, categoria, monto, nota } =
          doc.data();

        newGastos.push({
          nota: nota,
          idUser: idUser,
          monto: monto,
          id: doc.id,
          categoria: categoria,
          fechaCorta: fechaCorta,
          fecha: fecha, // id del DOCUMENTO
        });
      });
    });
    console.log(newGastos);
    setGastos(newGastos);
    setLoading(false);
  };
  const traerUmbral = async () => {
    let tieneIngresos = false;
    const fotosRef = collection(db, nameCollectionUmbral);
    const q = query(fotosRef);
    const querySnapshot = await getDocs(q);
    let mesact = new Date().getMonth();
    const newUmbral = [];
    querySnapshot.forEach((doc) => {
      const { monto, umbral, mes } = doc.data();
      if (mes == mesact) {
        tieneIngresos = true;
        setUmbral_(doc.data());
      }
      newUmbral.push({
        mes: mes,
        umbral: umbral,
        monto: monto,
      });
    });
    !tieneIngresos ? setShowModalIngreso(true) : setShowModalIngreso(false);
  };

  const updateCurrentUser = async (uid, setProfile) => {
    const docRef = doc(db, colectionUsers, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let auxUser = docSnap.data();
      setProfile(auxUser);
      console.log("actualizado el profile", auxUser);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return false;
    }
  };
  const btnAction = (bgColor, titulo, colorTitulo, icon, action = () => {}) => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: bgColor,
          borderRadius: 0,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          margin: 0,
          flexDirection: "row",
        }}
        onPress={action}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              color: colorTitulo,
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {titulo}
          </Text>
          {icon}
        </View>
      </TouchableOpacity>
    );
  };

  return loading ? (
    <LoadingScreen message={msj} />
  ) : (
    <View
      style={{
        backgroundColor: ColorsPPS.morado,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: Dimensions.get("window").height * 0.1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <View
            style={{
              borderRightWidth: 1,
              flex: 0.9,
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                width: "80%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white",
              }}
            >
              {" "}
              Ultimos Gastos{" "}
            </Text>
          </View>

          <TouchableOpacity
            style={{ flex: 0.3 }}
            onPress={() => {
              setMsj("cerrando sesión ..");
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setIsLogIn(false);
              }, 2000);
            }}
          >
            <AntDesign
              name="logout"
              size={40}
              color={"white"}
              style={{ marginHorizontal: 10, alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>

        {
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <ListGastos gastos={gastos} />
          </View>
        }

        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", height: "50%" }}>
            {btnAction(
              ColorsPPS.morado,
              "Añadir Gasto (Egreso) ",
              "white",
              <MaterialIcons
                name="attach-money"
                size={45}
                color={"white"}
                style={{ paddingHorizontal: 10 }}
              />,
              () => {
                setShowModalAddGasto(true);
              }
              //obtenerImgGalery
            )}
          </View>
          <View
            style={{
              width: "100%",
              height: "50%",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              {btnAction(
                ColorsPPS.violeta,
                "Ver estadísticas",
                "white",
                <AntDesign
                  name="piechart"
                  size={25}
                  color={"white"}
                  style={{ paddingHorizontal: 10 }}
                />,
                () => {
                  navigation.navigate("Estadisticas");
                }
              )}
            </View>
            <View style={{ flex: 1 }}>
              {btnAction(
                ColorsPPS.verde,
                "Ver Gastos vs Ahorro",
                "white",
                <Octicons
                  name="graph"
                  size={25}
                  color={"white"}
                  style={{ paddingHorizontal: 10 }}
                />,
                () => {
                  navigation.navigate("Ahorrosvs");
                }
              )}
            </View>
          </View>
        </View>
      </View>
      {
        <ModalAddIngreso
          showModal={showModalIngreso}
          setShowModal={setShowModalIngreso}
        />
      }
      {
        <ModalAddGastos
          showModal={showModalAddGasto}
          setShowModal={setShowModalAddGasto}
          traerData={traerData}
          setLoading={setLoading}
        />
      }
    </View>
  );
};
