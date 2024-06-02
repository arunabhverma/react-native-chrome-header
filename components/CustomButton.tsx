import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";

const hitSlop = { top: 10, bottom: 10, right: 10, left: 10 };

const CustomButton = ({ children, ...props }: PressableProps) => {
  return (
    <Pressable
      hitSlop={hitSlop}
      android_ripple={{ color: "rgb(100,100,100)", borderless: true }}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export default CustomButton;
