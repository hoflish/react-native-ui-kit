import React from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {IThemeProps, DISPLAYNAME_PREFIX} from '../common/types';
import {withTheme} from '../contexts/theme';
import Icon, {IconSource} from './Icon';
import Elevation from './Elevation';
import Config from './Config';

export interface IButtonProps {
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
  theme: IThemeProps;
}

class Button extends React.PureComponent<IButtonProps> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Button`;

  public static defaultProps = {
    type: 'solid',
    elevation: 0,
  };

  render() {
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
    const {
      colors,
      disabledOpacity,
      borderRadius,
      spacing,
      typography,
      colorWithAlpha,
    } = theme;

    let backgroundColor, borderColor, textColor, borderWidth;
    const buttonColor = colorOverride || colors.primary;
    const buttonBorderRadius = borderRadiusOverride || borderRadius.button;

    if (type === 'solid') {
      backgroundColor = buttonColor;

      if (disabled) {
        textColor = colorWithAlpha(colors.surface, disabledOpacity);
        backgroundColor = colorWithAlpha(colors.surface, disabledOpacity);
      } else {
        textColor = colors.surface;
      }
    } else {
      backgroundColor = 'transparent';

      if (disabled) {
        textColor = colorWithAlpha(buttonColor, disabledOpacity);
      } else {
        textColor = buttonColor;
      }
    }

    if (type === 'outline') {
      if (disabled) {
        borderColor = colorWithAlpha(buttonColor, disabledOpacity);
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

    const elevationStyle = {
      elevation,
      borderRadius: buttonBorderRadius,
      ...(type === 'outline' && elevation && {backgroundColor: colors.surface}),
    };

    const iconStyle = [
      styles.icon,
      {
        marginLeft: spacing.large,
        marginRight: -8,
      },
    ];

    return (
      <Elevation style={[styles.elevation, elevationStyle]}>
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
              style={
                [styles.label, typography.button, textStyle] as Array<object>
              }>
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
