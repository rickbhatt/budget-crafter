import LottieView from "lottie-react-native";
import { Text, View } from "react-native";

const Loader = ({ loadingText }: { loadingText?: string }) => {
  return (
    <View className="flex-1 flex-col flex-center bg-bg-primary">
      <LottieView
        source={require("@assets/lottie/moneystackloader.json")}
        autoPlay
        loop
        style={{ width: 180, height: 180 }}
      />
      {loadingText && (
        <Text className="h2-bold text-text-primary mt-3">{loadingText}</Text>
      )}
    </View>
  );
};

export default Loader;
