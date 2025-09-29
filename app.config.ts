import { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.ritankar.budgetcrafter.dev";
  }

  if (IS_PREVIEW) {
    return "com.ritankar.budgetcrafter.preview";
  }

  return "com.ritankar.budgetcrafter";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Budget Crafter (Dev)";
  }

  if (IS_PREVIEW) {
    return "Budget Crafter (Preview)";
  }

  return "Budget Crafter";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "budgetcrafter",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "budgetcrafter",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      monochromeImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: getUniqueIdentifier(),
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-web-browser",
    "expo-router",
    "expo-localization",
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/Quicksand-Bold.ttf",
          "./assets/fonts/Quicksand-Medium.ttf",
          "./assets/fonts/Quicksand-Regular.ttf",
          "./assets/fonts/Quicksand-SemiBold.ttf",
          "./assets/fonts/Quicksand-Light.ttf",
        ],
      },
    ],
    "expo-secure-store",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon-dark.png",
        resizeMode: "contain",
        imageWidth: 200,
        backgroundColor: "#ffffff",
        dark: {
          image: "./assets/images/splash-icon-light.png",
          backgroundColor: "#000000",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "",
    },
  },
  updates: {
    url: "",
    checkAutomatically: "ON_LOAD",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  owner: "ritankar",
});
