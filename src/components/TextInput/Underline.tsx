import React from 'react';
import {Animated, StyleSheet} from 'react-native';

type UnderlineProps = {
  parentState: {
    focused: boolean;
  };
  error?: boolean;
  colors: {
    error: string;
  };
  activeColor: string;
  underlineColorCustom?: string;
};

const Underline = ({
  parentState,
  error,
  colors,
  activeColor,
  underlineColorCustom,
}: UnderlineProps) => {
  let backgroundColor = parentState.focused
    ? activeColor
    : underlineColorCustom;
  if (error) {
    backgroundColor = colors.error;
  }
  return (
    <Animated.View
      style={[
        styles.underline,
        {
          backgroundColor,
          // Underlines is thinner when input is not focused
          transform: [{scaleY: parentState.focused ? 1 : 0.5}],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  underline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
  },
});

export default Underline;
