import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ModalCategorias = (props) => {
  const [error, setError] = useState("");
  const [data, setData] = useState([
    { id: 1, name: "Alimentos", iconName: "rest", coloIcon: "brown" },
    { id: 2, name: "Medicina", iconName: "medicinebox", coloIcon: "green" },
    { id: 3, name: "Servicios", iconName: "switcher", coloIcon: "gray" },
    { id: 4, name: "Impuestos", iconName: "calculator", coloIcon: "black" },
  ]);
  useEffect(() => {}, []);
  const { showModal, setShowModal, setCategoria } = props;

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        console.log("modal has been close");
      }}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          {/* BTN CERRAR  */}
          <View
            style={{
              borderWidth: 0,
              width: "100%",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "flex-end",
              paddingRight: 10,
              paddingTop: 10,
            }}
          >
            <Entypo
              name="cross"
              size={50}
              color={"blue"}
              onPress={() => setShowModal(false)}
            />
          </View>

          {/* TITULO */}
          <View
            style={{
              flex: 0.2,
              paddingHorizontal: 10,
              width: "100%",
              height: "100%",
            }}
          >
            <Text style={styles.txtTittle}>Elige la mas adecuada 😁</Text>
          </View>

          {/* CONTENIDO (LISTA) */}
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
              borderWidth: 0,
              padding: 0,
            }}
          >
            <FlatList
              data={data}
              renderItem={(currency) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "80%",
                      height: HEIGHT * 0.1,
                      borderRadius: 10,
                      justifyContent: "space-evenly",
                      alignContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      alignSelf: "center",
                      flexDirection: "row",
                      margin: 10,
                    }}
                    onPress={() => {
                      setCategoria(currency.item);
                      setShowModal(false);
                    }}
                  >
                    <AntDesign
                      name={currency.item.iconName}
                      size={20}
                      color={currency.item.coloIcon}
                    />
                    <Text>{currency.item.name}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.5}
              style={{ marginVertical: 5 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const Colors = {
  colorLetraGris: "#86939E",
  colorfondoCB: "transparent",
  violet: "#5D287E",
  azulPt: "#2E3880",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    borderWidth: 1,
    borderColor: Colors.violet,
    width: WIDTH * 0.8,
    height: HEIGHT * 0.7,
    backgroundColor: "white",
    alignSelf: "center",
    marginBottom: 0,
    alignContent: "center",
    borderRadius: 20,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  txtTittle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: Colors.azulPt,
  },
});

export default ModalCategorias;
