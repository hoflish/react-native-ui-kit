import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Theme} from '../../types';

type OutlineType = {
  activeColor: string;
  hasActiveOutline: boolean | undefined;
  outlineColor: string | undefined;
  backgroundColor: string | undefined;
  theme: Theme;
};

const Outline: React.FC<OutlineType> = ({
  theme,
  hasActiveOutline,
  activeColor,
  outlineColor,
  backgroundColor,
}) => (
  <View
    pointerEvents="none"
    style={[
      styles.outline,
      {
        backgroundColor,
        borderRadius: theme.borderRadius.global,
        borderWidth: hasActiveOutline ? 2 : 1,
        borderColor: hasActiveOutline ? activeColor : outlineColor,
      },
    ]}
  />
);

const styles = StyleSheet.create({
  outline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    bottom: 0,
  },
});

export default Outline;
