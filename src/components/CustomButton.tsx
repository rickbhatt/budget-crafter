import cn from "clsx";
import * as Haptics from "expo-haptics";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { CustomButtonProps } from "type";

const CustomButton = ({
  onPress,
  title,
  style,
  textStyle,
  leftIcon,
  isLoading = false,
  activityIndicatorColor,
  showElevation = false,
  disabled = false,
}: CustomButtonProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={{
        elevation: showElevation ? 10 : 0,
        shadowColor: showElevation ? "#878787" : undefined,
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
