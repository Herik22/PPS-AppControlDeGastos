import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { useLogin } from "../context/LoginProvider";
import firebase from "../dataBase/firebase";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useFocusEffect } from "@react-navigation/core";
import LoadingScreen from "../utils/loadingScreen";
import ColorsPPS from "../utils/ColorsPPS";
import { Entypo, FontAwesome } from "@expo/vector-icons";

const colores = [
  "red",
  "blue",
  "green",
  "yellow",
  "black",
  "pink",
  "orange",
  "violet",
  "gray",
  "aqua",
  "#FF1493",
  "#FFD700",
  "#BDB76B",
  "#FF00FF",
  "#006400,",
  "#7FFFD4",
  "#2F4F4F",
  "#D3D3D3",
];
const nameCollection = "collectionGastos";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height * 0.2;

const Estadisticas = () => {
  const [gastosAlimentos, setGastosAlimentos] = useState([]);
  const [gastosMedicina, setGastosMedicina] = useState([]);
  const [gastosServicios, setGastosServicios] = useState([]);
  const [gastosImpuestos, setGastosImpuestos] = useState([]);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const TraerDataOrdenada = async () => {
        firebase.db
          .collection(nameCollection)
          .orderBy("fecha", "desc")
          .onSnapshot((querySnapshot) => {
            const newGastosAlimentos = [];
            const newGastosMedicina = [];
            const newGastosServicios = [];
            const newGastosImpuestos = [];
            querySnapshot.docs.forEach((doc) => {
              const { idUser, fecha, fechaCorta, categoria, monto, nota } =
                doc.data(); // destructuro el doc
              console.log(doc.data());
              let BodyGasto = {
                name: nota,
                nota: nota,
                idUser: idUser,
                monto: monto,
                id: doc.id,
                categoria: categoria,
                fechaCorta: fechaCorta,
                fecha: fecha, // id del DOCUMENTO
                legendFontColor: "black",
                legendFontSize: 15, // id del DOCUMENTO
                color: colores[Math.round(Math.random() * (8 - 0) + 0)],
              };
              if (categoria.name == "Alimentos") {
                newGastosAlimentos.push(BodyGasto);
              }
              if (categoria.name == "Medicina") {
                newGastosMedicina.push(BodyGasto);
              }
              if (categoria.name == "Servicios") {
                newGastosServicios.push(BodyGasto);
              }
              if (categoria.name == "Impuestos") {
                newGastosImpuestos.push(BodyGasto);
              }
            });
            setGastosAlimentos(newGastosAlimentos);
            setGastosMedicina(newGastosMedicina);
            setGastosServicios(newGastosServicios);
            setGastosImpuestos(newGastosImpuestos);
          });
      };

      TraerDataOrdenada();
    }, [])
  );

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0,
    useShadowColorFromDataset: false, // optional
  };

  return loading ? (
    <LoadingScreen message={"Cargando datos ..."} />
  ) : (
    <ScrollView>
      <View
        style={{
          backgroundColor: ColorsPPS.violeta,
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
        }}
      >
        {/* Alimentos  */}
        <View>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
          >
            {" "}
            Categoria: Alimentos{" "}
          </Text>
          <PieChart
            data={gastosAlimentos}
            width={screenWidth}
            height={screenHeight}
            chartConfig={chartConfig}
            accessor={"monto"} //propiedad para los datos numericos.
            backgroundColor={ColorsPPS.amarillo}
            paddingLeft={"0"}
            center={[10, 5]}
            absolute
          />
        </View>

        {/* Medicina  */}
        <View>
          <View>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              {" "}
              Categoria: Medicina{" "}
            </Text>
            <PieChart
              data={gastosMedicina}
              width={screenWidth}
              height={screenHeight}
              chartConfig={chartConfig}
              accessor={"monto"} //propiedad para los datos numericos.
              backgroundColor={ColorsPPS.amarillo}
              paddingLeft={"0"}
              center={[10, 5]}
              absolute
            />
          </View>
        </View>
        {/* Servicios  */}
        <View>
          <View>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              {" "}
              Categoria: Servicios{" "}
            </Text>
            <PieChart
              data={gastosServicios}
              width={screenWidth}
              height={screenHeight}
              chartConfig={chartConfig}
              accessor={"monto"} //propiedad para los datos numericos.
              backgroundColor={ColorsPPS.amarillo}
              paddingLeft={"0"}
              center={[10, 5]}
              absolute
            />
          </View>
        </View>
        {/* Impuestos  */}
        <View>
          <View>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              {" "}
              Categoria: Impuestos{" "}
            </Text>
            <PieChart
              data={gastosImpuestos}
              width={screenWidth}
              height={screenHeight}
              chartConfig={chartConfig}
              accessor={"monto"} //propiedad para los datos numericos.
              backgroundColor={ColorsPPS.amarillo}
              paddingLeft={"0"}
              center={[10, 5]}
              absolute
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Estadisticas;
