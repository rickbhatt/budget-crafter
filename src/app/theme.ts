// theme.ts
import { configureFonts, MD3LightTheme } from "react-native-paper";

// Configure Quicksand for all Paper components
const fontConfig = {
  fontFamily: "Quicksand-Regular", // Uses your loaded font
};

export const paperTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
};
