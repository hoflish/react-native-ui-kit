import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import shadow from '../common/shadow';
import {useTheme} from '../contexts/theme';

export interface IElevationProps {
  children: React.ReactNode;
  style?: any;
}

const Elevation: React.FC<IElevationProps> = ({children, style, ...rest}) => {
  const theme = useTheme();
  const flattenedStyles = StyleSheet.flatten(style) || {};
  const {elevation} = flattenedStyles;

  return (
    <Animated.View
      {...rest}
      style={[elevation && shadow(elevation, theme), style]}>
      {children}
    </Animated.View>
  );
};

export default Elevation;
