import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderSearch from "@/components/HeaderSearch";

const Main = () => {
  const isActive = useSharedValue(0);
  const [text, setText] = useState("");

  const animatedContainer = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isActive.value ? "rgba(0,0,0,0.5)" : "transparent"
      ),
    };
  });

  return (
    <View style={styles.mainContainer}>
      <HeaderSearch value={text} onChangeText={setText} isActive={isActive} />
      <View style={styles.mainContainer}>
        <Animated.View
          pointerEvents={"none"}
          style={[styles.overlay, animatedContainer]}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            padding: 20,
          }}
          keyboardShouldPersistTaps={"handled"}
        >
          <MaterialCommunityIcons
            name="incognito-circle"
            size={84}
            color="rgb(242, 242, 242)"
          />
          <Text style={styles.heading}>React Native Chrome Header</Text>
          <Text style={[styles.subHeading, { marginTop: 40 }]}>
            Example of an animated Chrome-style header in React Native using
            Expo and Reanimated. Check it out on GitHub:
          </Text>
          <Text style={styles.subHeading}>
            https://github.com/arunabhverma/react-native-chrome-header.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  containerWrapper: {
    pointerEvents: "none",
    position: "absolute",
  },
  container: {
    backgroundColor: "rgb(30,30,30)",
  },
  heading: {
    fontSize: 27,
    color: "rgb(242,242,242)",
    fontWeight: "300",
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  subHeading: {
    fontSize: 18,
    color: "rgb(242,242,242)",
    fontWeight: "300",
    marginTop: 20,
  },
});
