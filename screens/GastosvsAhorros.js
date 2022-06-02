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
];
const nameCollection = "collectionGastos";
const nameCollectionUmbral = "collectionIngresos";
const screenWidth = Dimensions.get("window").width * 1;
const screenHeight = Dimensions.get("window").height * 0.4;

const GastosvsAhorros = () => {
  const { Email_, isLogIn, setIsLogIn, ingresos, umbral_, setUmbral_ } =
    useLogin();
  const [totalEnero, setTotalEnero] = useState(0);
  const [totalFebrero, setTotalFebrero] = useState(0);
  const [totalMarzo, setTotalMarzo] = useState(0);
  const [totalAbril, setTotalAbril] = useState(0);
  const [totalMayo, setTotalMayo] = useState(0);
  const [totalJunio, setTotalJunio] = useState(0);
  const [totalJulio, setTotalJulio] = useState(0);
  const [totalAgosto, setTotalAgosto] = useState(0);
  const [totalSeptiembre, setTotalSeptiembre] = useState(0);
  const [totalOctubre, setTotalOctubre] = useState(0);
  const [totalNoviembre, setTotalNoviembre] = useState(0);
  const [totalDiciembre, setTotalDiciembre] = useState(0);

  const [umbralEnero, setumbralEnero] = useState(0);
  const [umbralFebrero, setumbralFebrero] = useState(0);
  const [umbralMarzo, setumbralMarzo] = useState(0);
  const [umbralAbril, setumbralAbril] = useState(0);
  const [umbralMayo, setumbralMayo] = useState(0);
  const [umbralJunio, setumbralJunio] = useState(0);
  const [umbralJulio, setumbralJulio] = useState(0);
  const [umbralAgosto, setumbralAgosto] = useState(0);
  const [umbralSeptiembre, setumbralSeptiembre] = useState(0);
  const [umbralOctubre, setumbralOctubre] = useState(0);
  const [umbralNoviembre, setumbralNoviembre] = useState(0);
  const [umbralDiciembre, setumbralDiciembre] = useState(0);

  const [ahorroEnero, setahorroEnero] = useState(0);
  const [ahorroFebrero, setahorroFebrero] = useState(0);
  const [ahorroMarzo, setahorroMarzo] = useState(0);
  const [ahorroAbril, setahorroAbril] = useState(0);
  const [ahorroMayo, setahorroMayo] = useState(0);
  const [ahorroJunio, setahorroJunio] = useState(0);
  const [ahorroJulio, setahorroJulio] = useState(0);
  const [ahorroAgosto, setahorroAgosto] = useState(0);
  const [ahorroSeptiembre, setahorroSeptiembre] = useState(0);
  const [ahorroOctubre, setahorroOctubre] = useState(0);
  const [ahorroNoviembre, setahorroNoviembre] = useState(0);
  const [ahorroDiciembre, setahorroDiciembre] = useState(0);

  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const TraerDataOrdenada = async () => {
        firebase.db
          .collection(nameCollectionUmbral)
          .onSnapshot((querySnapshot) => {
            const newUmbral = [];
            querySnapshot.docs.forEach((doc) => {
              const { monto, umbral, mes } = doc.data(); // destructuro el doc
              let bodyUmbral = {
                monto: monto,
                umbral: umbral,
                mes: mes,
              };
              if (mes == 0) {
                setumbralEnero(doc.data().monto);
              }
              if (mes == 1) {
                setumbralFebrero(doc.data().monto);
              }
              if (mes == 2) {
                setumbralMarzo(doc.data().monto);
              }
              if (mes == 3) {
                setumbralAbril(doc.data().monto);
              }
              if (mes == 4) {
                setumbralMayo(doc.data().monto);
              }
              if (mes == 5) {
                setumbralJunio(doc.data().monto);
              }
              if (mes == 6) {
                setumbralJulio(doc.data().monto);
              }
              if (mes == 7) {
                setumbralAgosto(doc.data().monto);
              }
              if (mes == 8) {
                setumbralSeptiembre(doc.data().monto);
              }
              if (mes == 9) {
                setumbralOctubre(doc.data().monto);
              }
              if (mes == 10) {
                setumbralNoviembre(doc.data().monto);
              }
              if (mes == 11) {
                setumbralDiciembre(doc.data().monto);
              }
            });
          });

        setTimeout(() => {
          firebase.db
            .collection(nameCollection)
            .orderBy("fecha", "desc")
            .onSnapshot((querySnapshot) => {
              const newGastosEnero = [];
              const newGastosFebrero = [];
              const newGastosMarzo = [];
              const newGastosAbril = [];
              const newGastosMayo = [];
              const newGastosJunio = [];
              const newGastosJulio = [];
              const newGastosAgosto = [];
              const newGastosSeptiembre = [];
              const newGastosOctubre = [];
              const newGastosNoviembre = [];
              const newGastosDiciembre = [];

              querySnapshot.docs.forEach((doc) => {
                const {
                  idUser,
                  fecha,
                  fechaCorta,
                  categoria,
                  monto,
                  nota,
                  mes,
                } = doc.data(); // destructuro el doc

                let BodyGasto = {
                  name: nota,
                  nota: nota,
                  idUser: idUser,
                  monto: monto,
                  id: doc.id,
                  categoria: categoria,
                  fechaCorta: fechaCorta,
                  fecha: fecha, // id del DOCUMENTO
                  mes: mes,
                };
                if (mes == 0) {
                  newGastosEnero.push(BodyGasto);
                }
                if (mes == 1) {
                  newGastosFebrero.push(BodyGasto);
                }
                if (mes == 2) {
                  newGastosMarzo.push(BodyGasto);
                }
                if (mes == 3) {
                  newGastosAbril.push(BodyGasto);
                }
                if (mes == 4) {
                  newGastosMayo.push(BodyGasto);
                }
                if (mes == 5) {
                  newGastosJunio.push(BodyGasto);
                }
                if (mes == 6) {
                  newGastosJulio.push(BodyGasto);
                }
                if (mes == 7) {
                  newGastosAgosto.push(BodyGasto);
                }
                if (mes == 8) {
                  newGastosSeptiembre.push(BodyGasto);
                }
                if (mes == 9) {
                  newGastosOctubre.push(BodyGasto);
                }
                if (mes == 10) {
                  newGastosNoviembre.push(BodyGasto);
                }
                if (mes == 11) {
                  newGastosDiciembre.push(BodyGasto);
                }
              });
              getTotalMes(
                newGastosEnero,
                setTotalEnero,
                0,
                setahorroEnero,
                umbralEnero
              );
              getTotalMes(
                newGastosFebrero,
                setTotalFebrero,
                1,
                setahorroFebrero,
                umbralFebrero
              );
              getTotalMes(
                newGastosMarzo,
                setTotalMarzo,
                2,
                setahorroMarzo,
                umbralMarzo
              );
              getTotalMes(
                newGastosAbril,
                setTotalAbril,
                3,
                setahorroAbril,
                umbralAbril
              );
              getTotalMes(
                newGastosMayo,
                setTotalMayo,
                4,
                setahorroMayo,
                umbralMayo
              );
              getTotalMes(
                newGastosJunio,
                setTotalJunio,
                5,
                setahorroJunio,
                umbralJunio
              );
              getTotalMes(
                newGastosJulio,
                setTotalJulio,
                6,
                setahorroJulio,
                umbralJulio
              );
              getTotalMes(
                newGastosAgosto,
                setTotalAgosto,
                7,
                setahorroAgosto,
                umbralAgosto
              );
              getTotalMes(
                newGastosSeptiembre,
                setTotalSeptiembre,
                8,
                setahorroSeptiembre,
                umbralSeptiembre
              );
              getTotalMes(
                newGastosOctubre,
                setTotalOctubre,
                9,
                setahorroOctubre,
                umbralOctubre
              );
              getTotalMes(
                newGastosNoviembre,
                setTotalNoviembre,
                10,
                setahorroNoviembre,
                umbralNoviembre
              );
              getTotalMes(
                newGastosDiciembre,
                setTotalDiciembre,
                11,
                setahorroDiciembre,
                umbralDiciembre
              );
              setLoading(false);
            });
        }, 4000);
      };

      TraerDataOrdenada();
    }, [])
  );

  const getTotalMes = (array, set, mes, setAhorro, montoMes) => {
    let total = 0;
    if (array.length > 0) {
      array.forEach((item) => {
        total += item.monto;
      });
    }
    set(parseInt(total));
    getAhorroMes(total, mes, setAhorro, montoMes);
  };
  const getAhorroMes = (totalMes, mes, set, montomes) => {
    // obtener todo el total del mes y restarselo al umbral del mes.
    console.log("UMBRAL USELOGIN" + JSON.stringify(umbral_));
    console.log("TOTAL GASTADO MES" + totalMes);
    console.log("MONTO MES" + montomes);
    console.log("AHORRO MES" + mes);
    if (mes == 4) {
      var balance0 = montomes - totalMes;
    } else {
      var balance1 = montomes - totalMes;
    }

    mes == 4 ? set(balance0) : set(balance1);
  };

  const data = {
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    datasets: [
      {
        data: [
          totalEnero,
          totalFebrero,
          totalMarzo,
          totalAbril,
          totalMayo,
          totalJunio,
          totalJulio,
          totalAgosto,
          totalSeptiembre,
          totalOctubre,
          totalNoviembre,
          totalDiciembre,
        ], // gastos de cada mes.
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      },

      {
        data: [20, 10, 4, 56, 87, 90],
        color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // optional
      },
      /*
      {
        data: [30, 90, 67, 54, 10, 2],
      },
      */
    ],
    legend: ["Rainy Days", "Sunny Days", "Snowy Days"], // optional
  };
  const dataAhorro = {
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    datasets: [
      {
        data: [
          ahorroEnero,
          ahorroFebrero,
          ahorroMarzo,
          ahorroAbril,
          ahorroMayo,
          ahorroJunio,
          ahorroJulio,
          ahorroAgosto,
          ahorroSeptiembre,
          ahorroOctubre,
          ahorroNoviembre,
          ahorroDiciembre,
        ], // gastos de cada mes.
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      },

      {
        data: [20, 10, 4, 56, 87, 90],
        color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // optional
      },
      /*
      {
        data: [30, 90, 67, 54, 10, 2],
      },
      */
    ],
    legend: ["Rainy Days", "Sunny Days", "Snowy Days"], // optional
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 1,
      paddingHorizontal: 0,
    },
    barPercentage: 0.5,
  };

  const graphStyle = {
    marginVertical: 5,
    ...chartConfig.style,
  };
  return loading ? (
    <LoadingScreen message={"Cargando datos ..."} />
  ) : (
    <View
      style={{
        backgroundColor: ColorsPPS.violeta,
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 20,
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Monto mes Actual = ${umbralMayo}
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontSize: 20,
              fontWeight: "bold",
              width: "100%",
            }}
          >
            GastoTotal mes Actual = ${totalMayo}
          </Text>
        </View>

        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          Ahorros último año
        </Text>
        <ScrollView horizontal>
          <BarChart
            width={screenWidth}
            height={screenHeight}
            data={dataAhorro}
            yAxisLabel="$"
            chartConfig={chartConfig}
            style={graphStyle}
          />
        </ScrollView>
        <View style={{ alignSelf: "center", margin: 20 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Gastos último año
          </Text>

          <BarChart
            width={screenWidth}
            height={screenHeight}
            data={data}
            yAxisLabel="$"
            chartConfig={chartConfig}
            style={graphStyle}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GastosvsAhorros;
