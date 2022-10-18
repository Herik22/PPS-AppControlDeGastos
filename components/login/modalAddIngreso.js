import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import ColorsPPS from "../../utils/ColorsPPS";
import { Input } from "@rneui/base";
import { Formik } from "formik";
import * as yup from "yup";
import { useLogin } from "../../context/LoginProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import firebase from "../../dataBase/firebase";
import { db, app } from "../../firebase-config";
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
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const nameCollection = "collectionIngresos";
const ModalAddIngreso = (props) => {
  const { ingresos, setIngresos, umbral_, setUmbral_ } = useLogin();
  const [showFormUmbral, setShowFormUmbral] = useState(false);
  const [showFormIngresos, setShowFormIngresos] = useState(false);
  const [addIngreso, setAddIngreso] = useState(false);
  const [monto, setMonto] = useState(false);
  const [addUmbral, setAddUmbral] = useState(false);
  const [umbral, setUmbral] = useState(0);

  useEffect(() => {}, [ingresos]);
  const { showModal, setShowModal } = props;

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
  const onPressAddIngreso = (values) => {
    console.log(values);
    setAddIngreso(true);
    setShowFormUmbral(true);
    setShowFormIngresos(!showFormIngresos);
    setMonto(values.monto);
    setIngresos(values.monto);
  };
  const onPressAddUmbral = async (values) => {
    console.log(values);
    setAddUmbral(true);
    setUmbral(values.umbral);
    setUmbral_(values.umbral);
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let mesact = fecha.getMonth();

    let bodyUmbral = {
      monto: parseInt(monto),
      umbral: parseInt(values.umbral),
      mes: mesact,
    };

    await addDoc(collection(db, nameCollection), bodyUmbral);
    setTimeout(() => {
      setShowModal(!showModal);
    }, 1000);
  };
  const btnAddIngreso = (bgColor, color, txtName, action, values) => {
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
          onPressAddIngreso(values);
          /*alert("action??");
          console.log(action());
          action();*/
        }}
      >
        <FontAwesome5
          name="money-bill-wave"
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
  const btnAddUmbral = (bgColor, color, txtName, action, values) => {
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
          /*action();*/
          onPressAddUmbral(values);
        }}
      >
        <FontAwesome5
          name="money-bill-wave"
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
  const formLogin = () => {
    return (
      <Formik
        initialValues={{ monto: "" }}
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
              label="Monto mensual"
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
              onChange={(event) => setMonto(event.nativeEvent.text)}
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

            <View
              style={{
                height: HEIGHT * 0.15,
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {btnAddIngreso(
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
  const formUmbral = () => {
    return (
      <Formik
        initialValues={{ umbral: "" }}
        validationSchema={ingresosValidation}
        onSubmit={(values, actions) => {
          onPressAddIngreso(values);
          actions.resetForm();
        }}
      >
        {(formikprops) => (
          <View style={{ margin: 10, width: "90%" }}>
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                width: "100%",
                height: "30%",
                borderWidth: 0.5,
                borderColor: ColorsPPS.violeta,
                borderRadius: 10,
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 0.2,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="information"
                  size={40}
                  color={ColorsPPS.morado}
                />
              </View>
              <View
                style={{
                  flex: 0.8,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>
                  Agrega un porcentaje a tus gastos, el valor que ingreses será
                  tomado de forma relativa a tus ingresos actuales.{" "}
                </Text>
              </View>
            </View>
            <Input
              label="Ingresa  porcentaje"
              labelStyle={{ color: ColorsPPS.morado, fontSize: 20 }}
              style={{ width: "100%", padding: 10 }}
              inputContainerStyle={{
                borderColor: ColorsPPS.morado,
                width: "100%",
              }}
              inputStyle={{ color: ColorsPPS.verde, fontSize: 25 }}
              rightIcon={
                <FontAwesome
                  name="percent"
                  size={30}
                  color={ColorsPPS.morado}
                />
              }
              onChangeText={formikprops.handleChange("umbral")}
              onChange={(event) => setUmbral(event.nativeEvent.text)}
              value={formikprops.values.umbral}
              onBlur={formikprops.handleBlur("umbral")}
              name="umbral"
              keyboardType="number-pad"
            />
            {formikprops.touched.umbral && (
              <View style={{ borderWidth: 0, marginTop: -5 }}>
                <Text style={[styles.errorText]}>
                  {formikprops.touched.umbral && formikprops.errors.umbral}
                </Text>
              </View>
            )}

            <View
              style={{
                height: HEIGHT * 0.1,
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {btnAddUmbral(
                ColorsPPS.verde,
                "white",
                "Añadir umbral",
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
    >
      <KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: ColorsPPS.rosa,
            alignSelf: "center",
          }}
        >
          <View style={{ position: "absolute", top: 100 }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                padding: 10,
                textAlign: "center",
              }}
            >
              Agrega un monto para el mes
            </Text>
          </View>
          {!monto && (
            <TouchableOpacity
              style={styles.btnAddIngresos}
              onPress={() => {
                setShowFormIngresos(!showFormIngresos);
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>
                {" "}
                Agregar Ingresos{" "}
              </Text>
            </TouchableOpacity>
          )}
          <Fontisto
            name="money-symbol"
            color={"black"}
            size={100}
            style={{ margin: 5, alignSelf: "center" }}
          />
          {monto && (
            <View
              style={{
                width: Dimensions.get("window").width * 0.8,
                borderRadius: 10,

                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "green" }}
              >
                Monto agregado ! ✅
              </Text>
            </View>
          )}
          {showFormIngresos && !addIngreso && (
            <View
              style={{
                width: WIDTH * 0.8,
                height: HEIGHT * 0.35,
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
          )}
          {showFormUmbral && addIngreso && (
            <View
              style={{
                width: WIDTH * 0.8,
                height: HEIGHT * 0.45,
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
              {formUmbral()}
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  btnAddIngresos: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.06,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "green",
  },
  btnAddUmbral: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.04,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
  },
});
const Colors = {
  colorLetraGris: "#86939E",
  colorfondoCB: "transparent",
  violet: "#5D287E",
  azulPt: "#2E3880",
};

export default ModalAddIngreso;
