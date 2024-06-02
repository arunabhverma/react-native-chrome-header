import React from "react";
import { StyleSheet, Text, TextInput, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

interface HeaderSearchType {
  value: string;
  onChangeText: (e: string) => void;
  isActive: SharedValue<number>;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const HeaderSearch = ({ value, onChangeText, isActive }: HeaderSearchType) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const animatedHeaderMainContainer = useAnimatedStyle(() => {
    return {
      paddingTop: top,
      backgroundColor: withTiming(
        isActive.value ? "rgb(50,49,54)" : "rgb(30,30,30)"
      ),
    };
  });

  const animatedHeaderContainer = useAnimatedStyle(() => {
    return {
      marginLeft: withTiming(isActive.value ? -40 : 0, { duration: 200 }),
    };
  });

  const animatedInputWrapperContainer = useAnimatedStyle(() => {
    return {
      paddingVertical: withTiming(isActive.value ? 8 : 5, { duration: 200 }),
      borderRadius: withTiming(isActive.value ? 15 : 20, { duration: 200 }),
      width: withTiming(isActive.value ? width - 10 : width - 125, {
        duration: 200,
      }),
      backgroundColor: withTiming(isActive.value ? "rgb(30,30,30)" : "black", {
        duration: 200,
      }),
    };
  });

  const animatedIncognitoIconWrapper = useAnimatedStyle(() => {
    return {
      marginRight: withTiming(isActive.value ? -20 : 0, { duration: 200 }),
      left: withTiming(isActive.value ? -30 : 0, { duration: 200 }),
    };
  });

  return (
    <Animated.View
      style={[styles.headerMainContainer, animatedHeaderMainContainer]}
    >
      <Animated.View style={[styles.headerContainer, animatedHeaderContainer]}>
        <CustomButton onPress={() => {}}>
          <Ionicons name="home-outline" size={20} color="white" />
        </CustomButton>
        <Animated.View
          style={[styles.inputWrapperContainer, animatedInputWrapperContainer]}
        >
          <Animated.View
            style={[styles.incognitoIconWrapper, animatedIncognitoIconWrapper]}
          >
            <MaterialCommunityIcons name="incognito" size={18} color="white" />
          </Animated.View>
          <AnimatedTextInput
            value={value}
            cursorColor={"rgb(168,199,250)"}
            selectionColor={"rgba(168,199,250,0.3)"}
            selectionHandleColor={"rgb(168,199,250)"}
            onChangeText={onChangeText}
            onFocus={() => {
              isActive.value = 1;
            }}
            onBlur={() => {
              isActive.value = 0;
            }}
            placeholder="Search or type URL"
            placeholderTextColor={"white"}
            style={styles.textInputStyle}
          />
        </Animated.View>
        <Animated.View style={styles.menuButtonWrapper}>
          <CustomButton onPress={() => {}}>
            <Animated.View style={styles.tabIconContainer}>
              <Text style={styles.tabCount}>1</Text>
            </Animated.View>
          </CustomButton>
          <CustomButton onPress={() => {}}>
            <Ionicons name="ellipsis-vertical" size={20} color="white" />
          </CustomButton>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  headerMainContainer: {
    height: 108,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    gap: 15,
  },
  inputWrapperContainer: {
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: 3,
    gap: 10,
    alignItems: "center",
  },
  incognitoIconWrapper: {
    width: 24,
    aspectRatio: 1,
    backgroundColor: "rgb(58,58,58)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputStyle: {
    fontSize: 17,
    color: "white",
    fontWeight: "400",
    marginRight: 15,
    padding: 0,
    margin: 0,
    flex: 1,
  },
  menuButtonWrapper: {
    flexDirection: "row",
    gap: 15,
  },
  tabIconContainer: {
    width: 20,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  tabCount: {
    color: "white",
    marginTop: -2,
    fontSize: 12,
    fontWeight: "bold",
  },
});
