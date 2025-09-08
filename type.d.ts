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
  rightIcons?: React.ReactNode[];
  showBackBtn?: boolean;
  headerStyles?: string;
  iconBtnStyles?: string;
  iconColor?: string;
  showSettingBtn?: boolean;
}

interface HeaderBtn {
  onPress: () => void;
  icon: React.ReactNode;
  iconBtnStyles?: string;
}
