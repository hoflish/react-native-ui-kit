import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import shadow from '../styles/shadow';
import {useTheme} from '../core/theming';

interface Props {
  children: React.ReactNode;
  style?: any;
}

const Elevation: React.FC<Props> = ({children, style, ...rest}) => {
  const flattenedStyles = StyleSheet.flatten(style) || {};
  const {elevation} = flattenedStyles;
  const {colors} = useTheme();

  return (
    <Animated.View
      {...rest}
      style={[
        {backgroundColor: colors.surface},
        elevation && shadow(elevation),
        style,
      ]}>
      {children}
    </Animated.View>
  );
};

export default Elevation;
