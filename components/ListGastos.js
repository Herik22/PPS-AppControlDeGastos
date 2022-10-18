import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import {
  Entypo,
  AntDesign,
  Octicons,
  MaterialIcons,
  FontAwesome,
  Fontisto,
} from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/core";
import { useLogin } from "../context/LoginProvider";
//import firebase from "../dataBase/firebase";
import ColorsPPS from "../utils/ColorsPPS";

const ListGastos = (props) => {
  const { gastos } = props;
  const { Email_, isLogIn, setIsLogIn, ingresos, umbral_ } = useLogin();
  //const nameCollection = `post${photosGood ? "Buenos" : "Malos"}`;

  useEffect(() => {}, []);

  const ItemList = (props) => {
    const { info } = props;

    const { id, nota, idUser, monto, categoria, fechaCorta } = info.item;

    return (
      <View
        style={{
          flex: 1,
          border: "black",
          paddingBottom: 5,
          paddingTop: 5,
          width: "100%",
          height: Dimensions.get("window").height * 0.2,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "25%",
            borderBottomColor: "gray",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 0.33,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Categoria:</Text>
          </View>
          <View
            style={{
              flex: 0.66,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "gray" }}>
              {" "}
              {categoria.name}{" "}
            </Text>
            <AntDesign
              name={categoria.iconName}
              size={20}
              color={categoria.coloIcon}
              style={{ marginHorizontal: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "25%",
            borderBottomColor: "gray",
            borderBottomWidth: 0,
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 0.33,
              alignItems: "center",
              justifyContent: "flex-start",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Monto: </Text>
          </View>
          <View
            style={{
              flex: 0.66,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "gray" }}>
              ${monto}
            </Text>
            <FontAwesome
              name={"money"}
              size={20}
              color={"green"}
              style={{ marginHorizontal: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "25%",
            borderBottomColor: "gray",
            borderBottomWidth: 0,
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 0.33,
              alignItems: "center",
              justifyContent: "flex-start",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Nota: </Text>
          </View>
          <View
            style={{
              flex: 0.66,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "gray",
              }}
            >
              {nota}
            </Text>
            <FontAwesome
              name={"sticky-note-o"}
              size={20}
              color={"gray"}
              style={{ marginHorizontal: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "25%",
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 0.33,
              alignItems: "center",
              justifyContent: "flex-start",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Fecha: </Text>
          </View>
          <View
            style={{
              flex: 0.66,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "gray",
              }}
            >
              {fechaCorta}
            </Text>
            <Fontisto
              name={"date"}
              size={20}
              color={"red"}
              style={{ marginHorizontal: 10 }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <FlatList
        data={gastos}
        renderItem={(gasto) => <ItemList info={gasto} />}
        keyExtractor={(item, index) => index.toString()}
        style={{ borderWidth: 0 }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                width: "100%",
                height: Dimensions.get("window").height * 0.45,
              }}
            >
              <Text
                style={{
                  color: ColorsPPS.violeta,
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {" "}
                Aun no tienes ningun gasto este mes 👏🏽
              </Text>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: Dimensions.get("window").height * 0.3,
  },
});

export default ListGastos;
