import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {IThemeProps} from 'common/types';
import {useTheme} from 'contexts/theme';

export interface DividerProps {
  /**
   * Color of the Divider
   */
  color?: string;

  /**
   * Height of the Divider
   */
  height?: number;

  /**
   * Styles
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Theme
   */
  theme?: IThemeProps;
}

const Divider: React.FC<DividerProps> = ({color, height, style}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: color || colors.primary,
          height: height || StyleSheet.hairlineWidth,
        },
        style,
      ]}
    />
  );
};

export default Divider;
