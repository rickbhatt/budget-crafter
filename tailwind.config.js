/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
      },
      colors: {
        yellow: "#FFEA00",
        mint: "#A7F3D0",
        coral: "#FB7185",
        sky: "#7DD3FC",
        lavender: "#C084FC",
        peach: "#FDBA74",
        lime: "#BEF264",
        emerald: "#10B981",
        blue: "#3B82F6",
        orange: "#F59E0B",
        red: "#EF4444",
        purple: "#8B5CF6",
        // Background Colors
        "bg-primary": "#FFFFFF",
        "bg-secondary": "#F8FAFC",
        "bg-dark": "#151515",
        "inactive-tint": "#6B7280",
        "active-tint": "#3B82F6",

        // Text Colors
        "text-primary": "#151515", // Main text (using your dark)
        "text-secondary": "#4B5563", // Secondary text
        "text-tertiary": "#9CA3AF", // Labels, captions
        "text-light": "#FFFFFF", // Text on dark/colored backgrounds
        "text-muted": "#D1D5DB", // Disabled text

        // Border & Neutral
        border: "#E5E7EB", // Standard borders
        "border-light": "#F3F4F6", // Light borders
      },
    },
  },
  plugins: [],
};
