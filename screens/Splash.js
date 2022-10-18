import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import React, { Component, useEffect, useRef } from "react";
import { useLogin } from "../context/LoginProvider";
import LottieView from "lottie-react-native";
import splash_ from "../assets/splash/animated2.json";
import { LinearGradient } from "expo-linear-gradient";
import ColorsPPS from "../utils/ColorsPPS";

export default Splash = (props) => {
  const { navigation } = props;
  const { setisFinishSplash, setIsLogIn } = useLogin();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);
    animate();
  }, []);

  //ejemplo 2
  let animatedValue = new Animated.Value(0);
  const animate = () => {
    scaleValue.setValue(0);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {});
  };

  let scaleValue = new Animated.Value(0);

  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });
  /* ********* */
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#4C44CF",
      }}
    >
      <Animated.View
        style={{
          width: "80%",
          height: Dimensions.get("window").height * 0.4,
          transform: [{ scale: cardScale }],
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 35,
            textAlign: "center",
            width: "100%",
          }}
        >
          Herik Arismendy Division 4a
        </Text>
        <Image
          source={require("../assets/logos/iconlogo.png")}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </Animated.View>
    </View>
  );
};
