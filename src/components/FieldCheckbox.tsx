import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import color from 'color';

import {DISPLAYNAME_PREFIX} from '../common/utils';
import {withTheme} from '../core/theming';
import Touchable from './Touchable';
import Checkbox from './Checkbox';
import {Theme} from '../types';

type Props = {
  /**
   * Text title for the `FieldCheckbox`.
   */
  title: string;
  /**
   * Whether checkbox is checked
   */
  checked: boolean;

  /**
   * Whether checkbox is indeterminate
   */
  indeterminate?: boolean;

  /**
   * Whether checkbox is non-interactive.
   */
  disabled?: boolean;

  /**
   * Custom color for checked checkbox.
   */
  color?: string;

  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  style?: any;
  theme: Theme;
};

class FieldCheckbox extends React.Component<Props> {
  public static displayName = `${DISPLAYNAME_PREFIX}.FieldCheckbox`;

  public onPress = () => {
    const {onPress} = this.props;
    if (onPress) {
      onPress();
    }
  };

  public render() {
    const {
      title,
      checked,
      indeterminate,
      onPress,
      color: checkboxColor,
      disabled,
      theme: {colors, fonts, spacing, disabledOpacity},
    } = this.props;

    let titleColor = checked ? colors.primary : colors.medium;

    if (disabled) {
      titleColor = color(titleColor)
        .alpha(disabledOpacity)
        .rgb()
        .string();
    }

    return (
      <Touchable
        onPress={this.onPress}
        disabled={disabled}
        accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
        accessibilityComponentType="button"
        accessibilityRole="checkbox"
        accessibilityStates={
          disabled ? 'disabled' : checked ? 'checked' : 'unchecked'
        }
        accessibilityLiveRegion="polite">
        <View style={styles.container}>
          <Checkbox
            checked={checked}
            indeterminate={indeterminate}
            disabled={disabled}
            onPress={onPress}
            color={checkboxColor}
          />
          <Text
            style={[
              fonts.medium,
              {marginLeft: spacing.medium, color: titleColor},
            ]}>
            {title}
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withTheme(FieldCheckbox);
