import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import color from 'color';
import Touchable from 'react-native-platform-touchable';
import {useTheme} from '../core/theming';
import {View} from 'react-native';
import Icon, {IconSource} from './Icon';

interface Props {
  /**
   * Icon to display.
   */
  icon: IconSource;

  /**
   * Color of the icon
   */
  color?: string;

  /**
   * Size of the icon
   */
  size?: number;

  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;

  /**
   * Whether the button is loading. A loading button is greyed out and `onPress` is not called on touch.
   */
  loading?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  style?: any;
}

const IconButton: React.FC<Props> = ({
  icon,
  color: customColor,
  size,
  disabled,
  loading,
  accessibilityLabel,
  onPress,
  style,
  ...rest
}) => {
  const {colors, disabledOpacity} = useTheme();
  const iconColor = customColor || colors.strong;
  const rippleColor = color(iconColor)
    .alpha(disabledOpacity)
    .rgb()
    .string();

  return (
    <Touchable
      style={[
        styles.container,
        loading ||
          (disabled && {
            opacity: disabledOpacity,
          }),
        style,
      ]}
      background={Touchable.Ripple(rippleColor)}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || 'Icon button'}
      accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
      accessibilityComponentType="button"
      accessibilityRole="button"
      accessibilityStates={disabled ? ['disabled'] : undefined}
      hitSlop={{top: 6, left: 6, bottom: 6, right: 6}}
      {...rest}>
      <View>
        {icon && loading !== true ? (
          <Icon name={icon} size={size} color={iconColor} />
        ) : null}

        {loading ? <ActivityIndicator size="small" color={iconColor} /> : null}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;
