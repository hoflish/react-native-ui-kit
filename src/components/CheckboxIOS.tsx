import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from './Icon';
import {withTheme} from '../core/theming';
import {DISPLAYNAME_PREFIX} from '../common/utils';
import Touchable from "./Touchable";
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
      theme,
      ...rest
    } = this.props;
    const checkedColor = color || theme.colors.primary;
    const icon = indeterminate ? 'remove' : 'done';

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
            backgroundColor: checked ? checkedColor : theme.colors.surface,
            borderColor: theme.colors.light,
            borderWidth: checked ? 0 : 2,
            opacity: disabled ? theme.disabledOpacity : 1,
          },
        ]}>
        <View
          style={{
            opacity: indeterminate || disabled ? theme.disabledOpacity : 1,
          }}>
          <Icon
            name={icon}
            size={CheckboxIOS.SIZE}
            color={theme.colors.surface}
          />
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

export default withTheme(CheckboxIOS);
