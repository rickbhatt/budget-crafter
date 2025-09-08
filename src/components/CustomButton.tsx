import cn from "clsx";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

const CustomButton = ({
  onPress,
  title,
  style,
  textStyle,
  leftIcon,

  isLoading = false,
  activityIndicatorColor,
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        elevation: 10,
        shadowColor: "#878787",
      }}
      className={cn("custom-btn", style)}
    >
      {isLoading ? (
        <View className="flex-center flex-row">
          <ActivityIndicator size="small" color={activityIndicatorColor} />
        </View>
      ) : (
        <View className={cn("flex-center flex-row", leftIcon && "gap-x-2")}>
          {leftIcon && leftIcon}
          <Text className={cn("base-semibold", textStyle)}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default CustomButton;
