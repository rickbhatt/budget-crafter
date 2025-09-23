// theme.ts
import { configureFonts, MD3DarkTheme } from "react-native-paper";
const fontConfig = {
  default: {
    fontFamily: "Quicksand-Regular",
    fontWeight: "400" as const, // Regular weight (must be literal)
    letterSpacing: 0.5, // Adjust as needed
    lineHeight: 24, // Adjust based on font metrics
    fontSize: 16, // Default size
  },
};

// Override specific variants to use semibold (ensure "Quicksand-SemiBold" is loaded)
const variantOverrides = {
  labelLarge: {
    // For button labels like "Save"
    fontFamily: "Quicksand-SemiBold",
    fontWeight: "600" as const, // Semibold weight (literal)
    letterSpacing: 0.5,
    lineHeight: 20,
    fontSize: 14,
  },
  bodyMedium: {
    // For date numbers and general text in the picker
    fontFamily: "Quicksand-SemiBold",
    fontWeight: "600" as const,
    letterSpacing: 0.5,
    lineHeight: 20,
    fontSize: 14,
  },
  // Add more variants if needed (e.g., headlineSmall for month/year labels)
  headlineSmall: {
    fontFamily: "Quicksand-SemiBold",
    fontWeight: "600" as const,
    letterSpacing: 0,
    lineHeight: 32,
    fontSize: 24,
  },
};
export const paperTheme = {
  ...MD3DarkTheme, // Base on dark theme
  fonts: configureFonts({
    config: {
      ...fontConfig, // Include base config
      ...variantOverrides, // Apply semibold overrides
    },
  }),
  // Include your color overrides from previous queries
  colors: {
    ...MD3DarkTheme.colors,
    background: "#151515", // Modal background
    onSurface: "#FFFFFF", // Text color
    primary: "#808080", // Selection color
  },
};
