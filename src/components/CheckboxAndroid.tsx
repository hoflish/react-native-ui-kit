import React from 'react';
import {Animated} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {DISPLAYNAME_PREFIX} from '../common/types';
import {withTheme} from '../contexts/theme';
import {CheckboxProps} from './Checkbox';
import Icon from './Icon';
import {green, blue} from '../common/colors';

interface State {
  scaleAnim: Animated.Value;
}

class CheckboxAndroid extends React.Component<CheckboxProps, State> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Checkbox.Android`;

  public state: State = {
    scaleAnim: new Animated.Value(1),
  };

  public componentDidUpdate(prevProps: CheckboxProps) {
    if (prevProps.checked === this.props.checked) {
      return;
    }

    const {checked} = this.props;
    Animated.sequence([
      Animated.timing(this.state.scaleAnim, {
        toValue: 0.85,
        duration: checked ? 200 : 0,
      }),
      Animated.timing(this.state.scaleAnim, {
        toValue: 1,
        duration: checked ? 200 : 350,
      }),
    ]).start();
  }

  render() {
    const {
      checked,
      indeterminate,
      color,
      uncheckedColor,
      rippleColorOverride,
      disabled,
      onPress,
      theme: {colors, disabledOpacity},
      ...rest
    } = this.props;
    const uncheckedColorOverride = uncheckedColor || colors.medium;
    const checkedColor = color || colors.primary;
    const checkboxColor =
      checked || indeterminate ? checkedColor : uncheckedColorOverride;
    const rippleColor = rippleColorOverride || checkedColor;

    const icon = indeterminate
      ? 'indeterminate-check-box'
      : checked
      ? 'check-box'
      : 'check-box-outline-blank';

    return (
      <Touchable
        {...rest}
        background={Touchable.Ripple(rippleColor, true)}
        onPress={onPress}
        disabled={disabled}
        accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityStates={disabled ? ['disabled'] : undefined}
        accessibilityLiveRegion="polite"
        style={{
          borderRadius: 18,
          width: 30,
          height: 30,
          opacity: disabled ? disabledOpacity : 1,
        }}>
        <Animated.View style={{transform: [{scale: this.state.scaleAnim}]}}>
          <Icon name={icon} size={29} color={checkboxColor} />
        </Animated.View>
      </Touchable>
    );
  }
}

export default withTheme(CheckboxAndroid);
