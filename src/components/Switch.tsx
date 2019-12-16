import React from 'react';
import {Switch as NativeSwitch, Platform, SwitchProps} from 'react-native';
import {Theme} from '../types';
import { DISPLAYNAME_PREFIX } from '../common/utils';
import { withTheme } from '../core/theming';

interface Props extends SwitchProps {
  /**
   * Custom color for switch background.
   */
  checkedColorOverride?: string;

  /**
   * Custom color for the foreground switch grip.
   */
  thumbColorOverride?: string;

  /**
   * If true, a parent component "controls" the switch and passing
   * the new value as prop to the controlled component.
   */
  isControlled?: boolean;

  /**
   * @optional
   */
  theme: Theme;
}

class Switch extends React.Component<Props> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Switch`;

  render() {
    const {
      value,
      disabled,
      isControlled,
      onValueChange,
      checkedColorOverride,
      thumbColorOverride,
      theme: {colors, disabledOpacity},
      ...rest
    } = this.props;
    let thumbColor = undefined;
    let checkedColor = checkedColorOverride || colors.primary;

    if (Platform.OS !== 'ios') {
      thumbColor = thumbColorOverride || colors.surface;
    }
    return (
      <NativeSwitch
        {...rest}
        value={value}
        disabled={isControlled || disabled}
        onValueChange={onValueChange}
        trackColor={{false: '', true: checkedColor}}
        thumbColor={value ? thumbColor : colors.surface}
        style={{
          opacity: disabled && Platform.OS !== 'ios' ? disabledOpacity : 1,
        }}
      />
    );
  }
}

export default withTheme(Switch);
