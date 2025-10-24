import { cn } from "@/utils/cn";
import React from "react";
import { Image, Text, View } from "react-native";
import { EmptyStateProps } from "type";
import CustomButton from "./CustomButton";

const EmptyState = ({
  imageSource,
  title,
  description,
  actionLabel,
  onAction,
  containerStyle,
  imageStyle = "size-10",
}: EmptyStateProps) => {
  return (
    <View className={cn("flex-center flex-col py-12 px-6", containerStyle)}>
      {/* Icon */}
      <View className="mb-4">
        <Image
          source={imageSource}
          resizeMode="contain"
          className={cn(imageStyle)}
        />
      </View>

      {/* Title */}
      <Text className="h3-bold text-text-primary text-center mb-2">
        {title}
      </Text>

      {/* Description */}
      {description && (
        <Text className="paragraph-semibold text-text-secondary text-center mb-6 max-w-[75%]">
          {description}
        </Text>
      )}

      {/* Action Button */}
      {actionLabel && onAction && (
        <CustomButton
          title={actionLabel}
          onPress={onAction}
          style="bg-blue px-8 py-3 rounded-xl mt-2"
          textStyle="text-text-light base-semibold"
        />
      )}
    </View>
  );
};

export default EmptyState;
