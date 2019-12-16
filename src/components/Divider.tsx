import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import color from 'color';
import {Theme} from '../types';
import {useTheme} from '../core/theming';
import {black, white} from '../styles/colors';
import {DISPLAYNAME_PREFIX} from '../common/utils';
import Config from './Config';

interface Props {
  /**
   *  Whether divider has a left inset.
   */
  inset?: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
}

const Divider: React.FC<Props> = ({inset, style, ...rest}) => {
  const {dark: isDarkTheme} = useTheme();
  const backgroundColor = color(isDarkTheme ? white : black)
    .alpha(0.12)
    .rgb()
    .string();

  return (
    <View
      {...rest}
      style={[
        {
          height: StyleSheet.hairlineWidth,
          backgroundColor,
        },
        inset && styles.inset,
        style,
      ]}
    />
  );
};

Divider.displayName = `${DISPLAYNAME_PREFIX}.Divider`;

const styles = StyleSheet.create({
  inset: {
    marginLeft: Config.dividerLeftInset,
  },
});

export default Divider;
