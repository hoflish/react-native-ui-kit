import React from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import color from 'color';
import {DISPLAYNAME_PREFIX} from '../common/utils';
import {withTheme} from '../core/theming';
import Icon, {IconSource} from './Icon';
import Touchable from "./Touchable";
import Elevation from './Elevation';
import Config from './Config';
import {Theme} from '../types';
import {black} from '../styles/colors';

export type Props = {
  /**
   * Type of the button. You can change the type to adjust the styling to give it desired emphasis.
   * - `outline` - button with an outline (medium emphasis)
   * - `solid` - button with a background color (high emphasis)
   */
  type?: 'outline' | 'solid';

  /**
   * Custom text color for flat button, or background color for solid button.
   */
  color?: string;

  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;

  /**
   * Icon to display for the `Button`.
   */
  icon?: IconSource;

  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;

  /**
   * Sets the elevation of the button
   *
   * @platform android
   */
  elevation?: number;

  /**
   * Override the borderRadius of the button
   */
  borderRadiusOverride?: number;

  /**
   * Label text of the button.
   */
  children: React.ReactNode;

  /**
   * Function to execute on press.
   */
  onPress?: () => void;

  /**
   * Custom button Styles
   */
  style?: any;

  /**
   * Theme used to get button global styles
   */
  theme: Theme;
};

class Button extends React.Component<Props, {}> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Button`;

  public static defaultProps: Partial<Props> = {
    type: 'solid',
    elevation: 0,
  };

  public render() {
    const {
      type,
      color: colorOverride,
      elevation,
      borderRadiusOverride,
      disabled,
      loading,
      icon,
      children,
      onPress,
      style,
      theme,
    } = this.props;
    const {colors, disabledOpacity, borderRadius, spacing, fonts} = theme;

    let backgroundColor, borderColor, textColor, borderWidth;
    const buttonColor = colorOverride || colors.primary;
    const buttonBorderRadius = borderRadiusOverride || borderRadius.button;

    if (type === 'solid') {
      backgroundColor = buttonColor;

      if (disabled) {
        textColor = colors.disabled;
        backgroundColor = color(black)
          .alpha(0.12)
          .rgb()
          .string();
      } else {
        textColor = colors.surface;
      }
    } else {
      backgroundColor = 'transparent';

      if (disabled) {
        textColor = color(buttonColor)
          .alpha(disabledOpacity)
          .rgb()
          .string();
      } else {
        textColor = buttonColor;
      }
    }

    if (type === 'outline') {
      if (disabled) {
        borderColor = color(buttonColor)
          .alpha(0.29)
          .rgb()
          .string();
      } else {
        borderColor = buttonColor;
      }
      borderWidth = StyleSheet.hairlineWidth;
    } else {
      borderColor = 'transparent';
      borderWidth = 0;
    }

    const buttonStyle = {
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius: buttonBorderRadius,
    };

    const textStyle = {
      color: textColor,
      marginVertical: spacing.large,
      marginHorizontal: spacing.large,
    };

    const iconStyle = [
      styles.icon,
      {
        marginLeft: spacing.large,
        marginRight: -8,
      },
    ];

    return (
      <Elevation
        style={[
          styles.elevation,
          {
            elevation,
            borderRadius: buttonBorderRadius,
          },
        ]}>
        <Touchable
          onPress={onPress}
          accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
          accessibilityComponentType="button"
          disabled={disabled || loading}
          style={[styles.button, buttonStyle, style]}>
          <View style={styles.content}>
            {icon && loading !== true ? (
              <View style={iconStyle}>
                <Icon
                  name={icon}
                  size={Config.buttonIconSize}
                  color={textColor}
                />
              </View>
            ) : null}
            {loading ? (
              <ActivityIndicator
                size="small"
                color={textColor}
                style={iconStyle}
              />
            ) : null}
            <Text
              numberOfLines={1}
              style={[styles.label, fonts.regular, textStyle] as Array<object>}>
              {children}
            </Text>
          </View>
        </Touchable>
      </Elevation>
    );
  }
}

const styles = StyleSheet.create({
  elevation: {
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  button: {
    minWidth: 64,
    borderStyle: 'solid',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
  icon: {
    width: Config.buttonIconSize,
  },
});

export default withTheme(Button);
