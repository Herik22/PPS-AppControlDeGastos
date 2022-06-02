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
import firebase from "../dataBase/firebase";

const nameCollection = "collectionGastos";
const nameCollectionUmbral = "collectionIngresos";
export default Home = (props) => {
  const { navigation } = props;
  const { Email_, isLogIn, setIsLogIn, ingresos, umbral_, setUmbral_ } =
    useLogin();
  const [loading, setLoading] = useState(false);
  const [showModalIngreso, setShowModalIngreso] = useState(false);
  const [showModalAddGasto, setShowModalAddGasto] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [msj, setMsj] = useState("Trayendo información ... ");

  useEffect(() => {}, []);
  useFocusEffect(
    useCallback(() => {
      const TraerDataOrdenada = async () => {
        firebase.db
          .collection(nameCollection)
          .orderBy("fecha", "desc")
          .onSnapshot((querySnapshot) => {
            const newGastos = [];
            querySnapshot.docs.forEach((doc) => {
              const { idUser, fecha, fechaCorta, categoria, monto, nota } =
                doc.data(); // destructuro el doc
              console.log(doc.data());
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
            setGastos(newGastos);
          });
      };
      const TraerUmbral = async () => {
        let tieneIngresos = false;
        firebase.db
          .collection(nameCollectionUmbral)
          .onSnapshot((querySnapshot) => {
            let mesact = new Date().getMonth();
            const newUmbral = [];
            querySnapshot.docs.forEach((doc) => {
              const { monto, umbral, mes } = doc.data(); // destructuro el doc
              //console.log(doc.data());
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
            !tieneIngresos
              ? setShowModalIngreso(true)
              : setShowModalIngreso(false);
          });
      };

      TraerDataOrdenada();
      TraerUmbral();
    }, [])
  );

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
              }}
            >
              {" "}
              Ultimos Gastos{" "}
            </Text>
          </View>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              width: "30%",
              borderLeftWidth: 1,
              height: "50%",
              textAlign: "center",
            }}
            onPress={() => {
              setMsj("cerrando sesión ..");
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setIsLogIn(false);
              }, 2000);
            }}
          >
            {" "}
            Salir{" "}
          </Text>
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
              "black",
              <MaterialIcons
                name="attach-money"
                size={45}
                color={"black"}
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
                "black",
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
        />
      }
    </View>
  );
};
