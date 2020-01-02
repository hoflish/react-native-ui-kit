// TODO: REVIEW...
import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import color from 'color';
import {withTheme} from '../core/theming';
import Config from './Config';
import Touchable from './Touchable';
import Icon, {IconSource} from './Icon';
import Elevation from './Elevation';
import {Theme} from '../types';
import {black} from '../styles/colors';

interface Props {
  /**
   * Icon to display for the `FAB`.
   */
  icon: IconSource;

  /**
   * Optional label for extended `FAB`.
   */
  label?: string;

  /**
   * Accessibility label for the FAB. This is read by the screen reader when the user taps the FAB.
   * Uses `label` by default if specified.
   */
  accessibilityLabel?: string;

  /**
   *  Type of the FAB.
   *  - `standard` - a standard size FAB with no label and an icon (default)
   *  - `extended` - an extended FAB that is wider, and includes a text label
   */
  type?: 'standard' | 'extended';

  /**
   * Whether `FAB` is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;

  /**
   * Whether `FAB` is loading. A loading button is greyed out and `onPress` is not called on touch.
   */
  loading?: boolean;

  /**
   * Elevation of the `FAB`
   */
  elevation?: number;

  /**
   * Custom color of the `FAB`
   */
  color?: string;

  /**
   * Function to execute on press.
   */
  onPress?: () => void;

  /**
   * Styles
   */
  style?: any;

  /**
   * @optional
   */
  theme: Theme;
}

class FAB extends React.Component<Props> {
  public static defaultProps = {
    elevation: 2,
    type: 'standard',
  };

  public render() {
    const {
      type,
      icon,
      color: colorOverride,
      label,
      disabled,
      loading,
      onPress,
      elevation,
      style,
      theme,
      ...rest
    } = this.props;

    const {colors, borderRadius, spacing, fonts} = theme;

    let textColor = colors.surface;
    let backgroundColor = colorOverride || colors.primary;

    if (disabled) {
      textColor = color(black)
        .alpha(0.32)
        .rgb()
        .string();
      backgroundColor = color(black)
        .alpha(0.12)
        .rgb()
        .string();
    }

    const buttonStyle = {
      backgroundColor,
      borderRadius: borderRadius.button,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const buttonStyles = [styles.button, buttonStyle];

    const contentStyle = [styles.content];

    const textStyle = {
      textAlign: 'center',
      color: textColor,
    };

    const iconStyle = [
      styles.icon,
      {
        width: Config.buttonIconSize,
      },
    ];

    const elevationStyle = {
      elevation,
      alignSelf: 'stretch',
      overflow: 'hidden',
      borderRadius: Config.FABBorderRadius,
    };

    if (type === 'standard') {
      buttonStyle.width = Config.FABSize;
      buttonStyle.height = Config.FABSize;
      buttonStyle.borderRadius = Config.FABBorderRadius;

      elevationStyle.width = Config.FABSize;
      elevationStyle.height = Config.FABSize;

      contentStyle.push({
        width: Config.FABSize,
        height: Config.FABSize,
      });
    }

    if (type === 'extended') {
      iconStyle.push({
        marginLeft: spacing.large,
        marginRight: -8,
      });

      textStyle.margin = spacing.large;
      buttonStyles.push({
        paddingHorizontal: Config.FABExtendedPadding,
      });
    }

    return (
      <Elevation style={[elevationStyle, style]}>
        <Touchable
          {...rest}
          onPress={onPress}
          accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
          accessibilityComponentType="button"
          disabled={disabled || loading}
          style={buttonStyles}>
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
            {label ? (
              <Text numberOfLines={1} style={[textStyle, fonts.regular]}>
                {label}
              </Text>
            ) : null}
          </View>
        </Touchable>
      </Elevation>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: Config.buttonIconSize,
  },
});

export default withTheme(FAB);
