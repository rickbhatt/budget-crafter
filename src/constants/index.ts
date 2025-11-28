import type { Locale } from "date-fns";
import { de, enGB, enIN, enUS, es, fr, it, pt } from "date-fns/locale";
import { IconFamily } from "type";

// images
import wallet from "@assets/images/wallet.png";
import { getLocales } from "expo-localization";

const locales = getLocales()[0];

export const fnsLoacales: { [key: string]: Locale } = {
  "en-US": enUS,
  "en-GB": enGB,
  "en-IN": enIN,
  de: de,
  "de-DE": de,
  fr: fr,
  es: es,
  it: it,
  pt: pt,
  // Add more as needed
};

export const images = {
  wallet,
};

export const paymentMethodOptions = [
  {
    label: "Cash",
    value: "cash",
    icon: {
      family: "MaterialCommunityIcons" as const,
      name: "cash" as const,
    },
  },
  locales.languageRegionCode === "IN"
    ? {
        label: "UPI",
        value: "upi",
        icon: {
          family: "MaterialCommunityIcons" as const,
          name: "qrcode-scan" as const,
        },
      }
    : {
        label: "Digital Payment",
        value: "digitalPayment",
        icon: {
          family: "MaterialCommunityIcons" as const,
          name: "contactless-payment" as const,
        },
      },
  {
    label: "Debit Card",
    value: "debitCard",
    icon: {
      family: "MaterialCommunityIcons" as const,
      name: "credit-card" as const,
    },
  },
  {
    label: "Credit Card",
    value: "creditCard",
    icon: {
      family: "MaterialCommunityIcons" as const,
      name: "credit-card-outline" as const,
    },
  },
];

export const CUSTOM_CATEGORY_ICONS: {
  id: string;
  name: string;
  family: IconFamily;
  label: string;
}[] = [
  {
    id: "wifi-MaterialCommunityIcons",
    name: "wifi",
    family: "MaterialCommunityIcons",
    label: "Internet",
  },
  {
    id: "coffee-MaterialCommunityIcons",
    name: "coffee",
    family: "MaterialCommunityIcons",
    label: "Coffee",
  },
  {
    id: "shop-AntDesign",
    name: "shop",
    family: "AntDesign",
    label: "Shop",
  },
  {
    id: "youtube-Entypo",
    name: "youtube",
    family: "Entypo",
    label: "Youtube",
  },
  {
    id: "netflix-MaterialCommunityIcons",
    name: "netflix",
    family: "MaterialCommunityIcons",
    label: "Netflix",
  },
  {
    id: "spotify-AntDesign",
    name: "spotify",
    family: "AntDesign",
    label: "Netflix",
  },
  {
    id: "airplane-MaterialCommunityIcons",
    name: "airplane",
    family: "MaterialCommunityIcons",
    label: "Travel",
  },
  {
    id: "dumbbell-MaterialCommunityIcons",
    name: "dumbbell",
    family: "MaterialCommunityIcons",
    label: "Gym",
  },
  {
    id: "paw-MaterialCommunityIcons",
    name: "paw",
    family: "MaterialCommunityIcons",
    label: "Pets",
  },
  {
    id: "briefcase-MaterialCommunityIcons",
    name: "briefcase",
    family: "MaterialCommunityIcons",
    label: "Work",
  },
  {
    id: "tools-MaterialCommunityIcons",
    name: "tools",
    family: "MaterialCommunityIcons",
    label: "Repairs",
  },
  {
    id: "baby-carriage-MaterialCommunityIcons",
    name: "baby-carriage",
    family: "MaterialCommunityIcons",
    label: "Baby",
  },
  {
    id: "beer-MaterialCommunityIcons",
    name: "beer",
    family: "MaterialCommunityIcons",
    label: "Drinks",
  },
  {
    id: "book-open-MaterialCommunityIcons",
    name: "book-open",
    family: "MaterialCommunityIcons",
    label: "Books",
  },

  {
    id: "tshirt-crew-MaterialCommunityIcons",
    name: "tshirt-crew",
    family: "MaterialCommunityIcons",
    label: "Clothing",
  },
  {
    id: "run-MaterialCommunityIcons",
    name: "run",
    family: "MaterialCommunityIcons",
    label: "Sports",
  },
  {
    id: "wrench-MaterialCommunityIcons",
    name: "wrench",
    family: "MaterialCommunityIcons",
    label: "Repairs",
  },
  {
    id: "heart-MaterialCommunityIcons",
    name: "heart",
    family: "MaterialCommunityIcons",
    label: "Romance",
  },
  {
    id: "star-MaterialCommunityIcons",
    name: "star",
    family: "MaterialCommunityIcons",
    label: "Favorites",
  },
  {
    id: "cash-MaterialCommunityIcons",
    name: "cash",
    family: "MaterialCommunityIcons",
    label: "Cash",
  },
];
