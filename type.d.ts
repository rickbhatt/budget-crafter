import { Href } from "expo-router";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
  activityIndicatorColor?: string;
}

interface ScreenHeaderProps {
  title: string;
  rightIcons?: {
    icon: React.ReactNode;
    path: Href;
    name: string;
  }[];
  showBackBtn?: boolean;
  headerStyles?: string;
  iconBtnStyles?: string;
  iconColor?: string;
  showSettingBtn?: boolean;
}

interface HeaderBtnProps {
  onPress: () => void;
  icon: React.ReactNode;
  iconBtnStyles?: string;
}
