import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
const CustomButton = ({
  onPress,
  title = "Click me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={cn("custom-btn", style)}>
      {leftIcon}
      <View className="flex-row flex-center">
        {isLoading ? (
          <ActivityIndicator
            size={"small"}
            color={"white"}
            className="loader mr-2"
          />
        ) : (
          <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
