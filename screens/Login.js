import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Input } from "@rneui/base";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../context/LoginProvider";
import ModalLogin from "../components/login/modalLogin";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import { authentication, db } from "../firebase-config";
import { LinearGradient } from "expo-linear-gradient";

const Login = (props) => {
  const { setisFinishSplash, setIsLogIn, setProfile } = useLogin();
  const { navigation } = props;
  const { setEmail_ } = useLogin();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {}, []);

  const login = (values, actions = false) => {
    try {
      setLoading(true);
      authentication
        .signInWithEmailAndPassword(values.email, values.password)
        .then((_userCredentials) => {
          actions && actions.resetForm();
          setLoading(false);
          setIsLogIn(true);
        })
        .catch((error) => {
          setLoading(false);
          switch (error.code) {
            case "auth/user-not-found":
              Alert.alert("¡Ops!", "¡Usuario y/o Contraseña incorrectos!");
              break;
            case "auth/wrong-password":
              Alert.alert("¡Ops!", "¡Usuario y/o Contraseña incorrectos!");
              break;
          }
        });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const btnLogin = (bgColor, color, txtName, action) => {
    return (
      <TouchableOpacity
        style={{
          height: "40%",
          width: "80%",
          backgroundColor: bgColor,
          alignSelf: "center",
          justifyContent: "center",
          margin: 0,
          borderRadius: 20,
        }}
        onPress={() => {
          action();
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: color,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {" "}
          {txtName}{" "}
        </Text>
      </TouchableOpacity>
    );
  };
  const btnInvited = (number, txtName) => {
    const onpressInvited = (numero) => {
      login({
        email: `invitado${numero}@gmail.com`,
        password: "invitado1234",
      });
    };
    return (
      <TouchableOpacity
        style={{
          height: "70%",
          width: "30%",
          backgroundColor: ColorsPPS.verde,
          alignSelf: "center",
          justifyContent: "center",
          margin: 10,
          borderRadius: 10,
          borderColor: ColorsPPS.azul,
        }}
        onPress={() => {
          onpressInvited(number);
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {" "}
          {txtName}{" "}
        </Text>
      </TouchableOpacity>
    );
  };

  const LoginValidation = yup.object({
    email: yup
      .string()
      .required("Ingresa tu correo electrónico")
      .email("El formato el email es invalido"),

    password: yup.string().required("Ingresa tu contraseña"),
  });

  const formLogin = () => {
    return (
      <Formik
        initialValues={{ email: email, password: "" }}
        validationSchema={LoginValidation}
        onSubmit={(values, actions) => {
          login(values, actions);
        }}
      >
        {(formikprops) => (
          <View style={{ margin: 10 }}>
            <Input
              label="Correo Electrónico"
              labelStyle={{ color: ColorsPPS.morado }}
              style={{ width: "100%", padding: 10 }}
              inputContainerStyle={{ borderColor: ColorsPPS.morado }}
              leftIcon={
                <Ionicons
                  name="people-outline"
                  size={20}
                  color={ColorsPPS.morado}
                />
              }
              onChangeText={formikprops.handleChange("email")}
              onChange={(event) => setEmail(event.nativeEvent.text)}
              value={email}
              onBlur={formikprops.handleBlur("email")}
              defaultValue={email}
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {formikprops.touched.email && (
              <View style={{ borderWidth: 0, marginTop: -5 }}>
                <Text style={[styles.errorText]}>
                  {formikprops.touched.email && formikprops.errors.email}
                </Text>
              </View>
            )}
            <Input
              label="Contraseña"
              labelStyle={{ color: ColorsPPS.morado }}
              containerStyle={{}}
              inputContainerStyle={{
                color: ColorsPPS.azul,
                borderColor: ColorsPPS.morado,
              }}
              style={{ width: "100%", padding: 10 }}
              leftIcon={
                <Ionicons name="key" size={20} color={ColorsPPS.morado} />
              }
              onChangeText={formikprops.handleChange("password")}
              onChange={(event) => setPassword(event.nativeEvent.text)}
              value={password}
              onBlur={formikprops.handleBlur("password")}
              defaultValue={password}
              name="password"
              secureTextEntry={hidePassword}
              rightIcon={
                <Ionicons
                  name={hidePassword ? "eye" : "eye-off"}
                  size={20}
                  color={ColorsPPS.morado}
                  onPress={() => {
                    setHidePassword(!hidePassword);
                  }}
                />
              }
            />
            {formikprops.touched.password && (
              <View style={{ borderWidth: 0, marginTop: -5 }}>
                <Text style={[styles.errorText]}>
                  {formikprops.touched.password && formikprops.errors.password}
                </Text>
              </View>
            )}

            <View
              style={{
                height: Dimensions.get("window").height * 0.15,
                width: "100%",
                justifyContent: "center",
              }}
            >
              {btnLogin(
                ColorsPPS.verde,
                "white",
                "Entrar",
                formikprops.handleSubmit
              )}
            </View>
          </View>
        )}
      </Formik>
    );
  };
  /*
<LoadingScreen message={'Trayendo tus productos...'} />
*/
  return loading ? (
    <LoadingScreen message={"Iniciando Sesión ... "} />
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "white",
      }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={[ColorsPPS.violeta, ColorsPPS.verde, ColorsPPS.morado]}
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <View
          style={{
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").height * 0.8,
            backgroundColor: ColorsPPS.rosa,
            borderRadius: 20,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              marginVertical: 10,
              flex: 0.2,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: ColorsPPS.verde,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Inicia sesión y (gestiona tus gastos)
            </Text>
            <SimpleLineIcons
              name="organization"
              color={ColorsPPS.verde}
              size={30}
            />
          </View>

          <View style={{ flex: 0.6, width: "100%", padding: 20 }}>
            {formLogin()}
          </View>
        </View>

        <View
          style={{
            flex: 0.35,
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
            padding: 5,
            marginTop: 20,
            width: Dimensions.get("window").width * 0.95,

            borderRadius: 20,
            alignSelf: "center",
            backgroundColor: ColorsPPS.rosa,
          }}
        >
          {btnInvited(1, "Invitado 1")}
          {btnInvited(2, "Invitado 2")}
          {btnInvited(3, "Invitado 3")}
        </View>
        {
          <ModalLogin
            showModal={showModal}
            setShowModal={setShowModal}
            message={"Ups,El usuario no se encuentra registrado."}
          />
        }
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
});
export default Login;
