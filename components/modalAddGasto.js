import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import ColorsPPS from "../utils/ColorsPPS";
import { Input } from "@rneui/base";
import { Formik } from "formik";
import * as yup from "yup";
import { useLogin } from "../context/LoginProvider";
import ModalCategorias from "./modalCategorias";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db, app } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  setDoc,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
//import firebase from "../dataBase/firebase";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const nameCollection = "collectionGastos";

const ModalAddGastos = (props) => {
  const { ingresos, profile } = useLogin();
  const [showFormUmbral, setShowFormUmbral] = useState(false);
  const [showFormIngresos, setShowFormIngresos] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);
  const [montoGasto, setMontoGasto] = useState(0);
  const [nota, setNota] = useState("");
  const [categoria, setCategoria] = useState({
    id: "",
    name: "Alimentos",
    iconName: "rest",
    coloIcon: "brown",
  });

  useEffect(() => {
    console.log(ingresos);
  }, [ingresos]);

  const { showModal, setShowModal, traerData, setLoading } = props;

  const ingresosValidation = yup.object({
    monto: yup
      .number("Solo se pueden ingresar números")
      .required("Ingresa tus entradas mensuales.")
      .min(1, "El monto debe ser mayor a $0"),
    umbral: yup
      .number("Solo se pueden ingresar números")
      .required("Ingresa un valor.")
      .min(1, "El valor debe ser mayor a 0"),
  });
  const onPressAddNota = (values) => {
    crearGastoFB(values, categoria);
    setShowModal(false);
  };

  const btnAddNota = (bgColor, color, txtName, action, values) => {
    return (
      <TouchableOpacity
        style={{
          height: "40%",
          width: "100%",
          backgroundColor: bgColor,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          flexDirection: "row",
        }}
        onPress={() => {
          onPressAddNota(values);
          /*alert("action??");
          console.log(action());
          action();*/
        }}
      >
        <FontAwesome
          name="sticky-note-o"
          size={20}
          color={"white"}
          style={{ marginHorizontal: 10 }}
        />
        <Text
          style={{
            textAlign: "center",
            color: color,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {txtName}
        </Text>
      </TouchableOpacity>
    );
  };
  const crearGastoFB = async (values, categoria) => {
    setLoading(true);
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let mesact = fecha.getMonth();
    let bodyGasto = {
      nota: values.nota,
      monto: parseInt(values.monto),
      categoria: categoria,
      fechaCorta: hoy,
      mes: mesact,
      fecha: fecha,
      idUser: profile.id,
    };
    await addDoc(collection(db, nameCollection), bodyGasto);
    setLoading(false);
    traerData();
    //firebase.db.collection(nameCollection).add(bodyGasto);
  };
  const formLogin = () => {
    return (
      <Formik
        initialValues={{ monto: "", nota: "" }}
        validationSchema={ingresosValidation}
        onSubmit={(values, actions) => {
          alert("oprimido");
          onPressAddIngreso(values);
          actions.resetForm();
        }}
      >
        {(formikprops) => (
          <View style={{ margin: 10, width: "90%" }}>
            <Input
              label="¿Categoría?"
              labelStyle={{ color: ColorsPPS.morado, fontSize: 30 }}
              style={{ width: "100%", padding: 10 }}
              inputContainerStyle={{
                borderColor: ColorsPPS.morado,
                width: "100%",
              }}
              inputStyle={{ color: ColorsPPS.verde, fontSize: 25 }}
              leftIcon={
                <AntDesign
                  name="caretdown"
                  size={30}
                  color={ColorsPPS.morado}
                />
              }
              value={categoria.name}
              editable={false}
              onPressIn={() => {
                setShowCategorias(true);
              }}
            />
            <Input
              label="¿Monto?"
              labelStyle={{ color: ColorsPPS.morado, fontSize: 30 }}
              style={{ width: "100%", padding: 10 }}
              inputContainerStyle={{
                borderColor: ColorsPPS.morado,
                width: "100%",
              }}
              inputStyle={{ color: ColorsPPS.verde, fontSize: 25 }}
              leftIcon={
                <MaterialIcons
                  name="attach-money"
                  size={30}
                  color={ColorsPPS.morado}
                />
              }
              onChangeText={formikprops.handleChange("monto")}
              onChange={(event) => setMontoGasto(event.nativeEvent.text)}
              value={formikprops.values.monto}
              onBlur={formikprops.handleBlur("monto")}
              name="monto"
              keyboardType="number-pad"
            />
            {formikprops.touched.monto && (
              <View style={{ borderWidth: 0, marginTop: -5 }}>
                <Text style={[styles.errorText]}>
                  {formikprops.touched.monto && formikprops.errors.monto}
                </Text>
              </View>
            )}
            <Input
              label="Nota"
              labelStyle={{ color: ColorsPPS.morado, fontSize: 30 }}
              style={{ width: "100%", padding: 10 }}
              inputContainerStyle={{
                borderColor: ColorsPPS.morado,
                width: "100%",
              }}
              inputStyle={{ color: ColorsPPS.verde, fontSize: 25 }}
              leftIcon={
                <MaterialIcons
                  name="create"
                  size={30}
                  color={ColorsPPS.morado}
                />
              }
              onChangeText={formikprops.handleChange("nota")}
              onChange={(event) => setNota(event.nativeEvent.text)}
              value={formikprops.values.nota}
              onBlur={formikprops.handleBlur("nota")}
              name="nota"
            />

            <View
              style={{
                height: HEIGHT * 0.15,
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {btnAddNota(
                ColorsPPS.verde,
                "white",
                "Agregar",
                formikprops.handleSubmit,
                formikprops.values
              )}
            </View>
          </View>
        )}
      </Formik>
    );
  };

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        console.log("modal has been close");
      }}
      style={{}}
    >
      <KeyboardAwareScrollView>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <View
          style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: ColorsPPS.rosa,
          }}
        >
          {!showCategorias && (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                width: "100%",
                height: HEIGHT * 0.12,
                justifyContent: "center",
                paddingLeft: 10,
              }}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Entypo name="back" size={40} color="black" />
            </TouchableOpacity>
          )}
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "500",
              color: ColorsPPS.morado,
              margin: 10,
            }}
          >
            {" "}
            Agregar Gasto{" "}
          </Text>
          <View
            style={{
              width: WIDTH * 0.8,
              height: HEIGHT * 0.7,
              borderRadius: 20,
              padding: 5,
              alignSelf: "center",
              backgroundColor: "white",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            {formLogin()}
          </View>
          {
            <ModalCategorias
              showModal={showCategorias}
              setShowModal={setShowCategorias}
              setCategoria={setCategoria}
            />
          }
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  btnAddIngresos: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.04,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default ModalAddGastos;
