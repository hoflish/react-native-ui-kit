import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from './Icon';
import {DISPLAYNAME_PREFIX} from '../constants';
import Touchable from './Touchable';
import {CheckboxProps} from './Checkbox';

class CheckboxIOS extends React.Component<CheckboxProps> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Checkbox.IOS`;

  public static readonly SIZE = 24;

  public render() {
    const {
      checked,
      indeterminate,
      color,
      disabled,
      onPress,
      theme: {colors, disabledOpacity},
      ...rest
    } = this.props;
    const checkedColor = color || colors.primary;
    const icon = indeterminate ? 'remove' : 'done';
    const opacity = disabled ? disabledOpacity : 1;
    const borderWidth = checked ? 0 : 2;

    return (
      <Touchable
        {...rest}
        onPress={onPress}
        disabled={disabled}
        accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityStates={disabled ? ['disabled'] : undefined}
        accessibilityLiveRegion="polite"
        style={[
          styles.container,
          {
            backgroundColor: checked ? checkedColor : colors.surface,
            borderColor: colors.light,
            borderWidth,
            opacity,
          },
        ]}>
        <View style={{opacity}}>
          <Icon name={icon} size={CheckboxIOS.SIZE} color={colors.surface} />
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    width: 25,
    height: 25,
  },
});

export default CheckboxIOS;
