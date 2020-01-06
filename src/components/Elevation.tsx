import * as React from 'react';
import {Animated, StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import shadow from '../styles/shadow';
import {useTheme} from '../core/theming';

type Props = React.ComponentProps<typeof View> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

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
