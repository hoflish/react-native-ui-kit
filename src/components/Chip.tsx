import React from 'react';
import {
  AccessibilityState,
  AccessibilityTrait,
  Animated,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import color from 'color';
import Icon, {IconSource} from './Icon';
import Text from './Typography/Text';
import {withTheme} from '../core/theming';
import {black, white} from '../styles/colors';
import {Theme} from '../types';
import Touchable from './Touchable';
import Elevation from './Elevation';
import IconButton from './IconButton';
import {DISPLAYNAME_PREFIX} from '../constants';

type Props = {
  /**
   * Mode of the chip.
   * - `flat` - flat chip without outline.
   * - `outlined` - chip with an outline.
   */
  mode?: 'flat' | 'outlined';
  /**
   * Text content of the `Chip`.
   */
  children: React.ReactNode;
  /**
   * Icon to display for the `Chip`. Both icon and avatar cannot be specified.
   */
  icon?: IconSource;
  /**
   * Avatar to display for the `Chip`. Both icon and avatar cannot be specified.
   */
  avatar?: React.ReactNode;
  /**
   * Whether chip is selected.
   */
  selected?: boolean;
  /**
   * Whether to style the chip color as selected.
   */
  selectedColor?: string;
  /**
   * Whether the chip is disabled. A disabled chip is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Accessibility label for the chip. This is read by the screen reader when the user taps the chip.
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Function to execute on long press.
   */
  onLongPress?: () => void;
  /**
   * Function to execute on close button press. The close button appears only
   * when this prop is specified.
   */
  onClose?: () => void;
  /**
   * Style of chip's text
   */
  textStyle?: any;
  style?: StyleProp<ViewStyle>;

  /**
   * @optional
   */
  theme: Theme;
  /**
   * Pass down testID from chip props to touchable for Detox tests.
   */
  testID?: string;
};

type State = {
  elevation: Animated.Value;
};

class Chip extends React.Component<Props, State> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Chip`;

  public static defaultProps: Partial<Props> = {
    mode: 'flat',
    disabled: false,
    selected: false,
  };

  public state = {
    elevation: new Animated.Value(0),
  };

  private handlePressIn = () => {
    Animated.timing(this.state.elevation, {
      toValue: 4,
      duration: 200,
    }).start();
  };

  private handlePressOut = () => {
    Animated.timing(this.state.elevation, {
      toValue: 0,
      duration: 150,
    }).start();
  };

  public render() {
    const {
      mode,
      children,
      icon,
      avatar,
      selected,
      disabled,
      accessibilityLabel,
      onPress,
      onLongPress,
      onClose,
      textStyle,
      style,
      theme,
      testID,
      selectedColor,
      ...rest
    } = this.props;
    const {dark, colors} = theme;

    const {
      backgroundColor = mode === 'outlined'
        ? colors.surface
        : dark
        ? '#383838'
        : '#ebebeb',
      borderRadius = 16,
    } = StyleSheet.flatten(style) || {};

    const borderColor =
      mode === 'outlined'
        ? color(
            selectedColor !== undefined
              ? selectedColor
              : color(dark ? white : black),
          )
            .alpha(0.29)
            .rgb()
            .string()
        : backgroundColor;
    const textColor = disabled
      ? colors.disabled
      : color(selectedColor !== undefined ? selectedColor : colors.text)
          .alpha(0.87)
          .rgb()
          .string();
    const iconColor = disabled
      ? colors.disabled
      : color(selectedColor !== undefined ? selectedColor : colors.text)
          .alpha(0.54)
          .rgb()
          .string();
    const selectedBackgroundColor = (dark
      ? color(backgroundColor).lighten(mode === 'outlined' ? 0.2 : 0.4)
      : color(backgroundColor).darken(mode === 'outlined' ? 0.08 : 0.2)
    )
      .rgb()
      .string();

    const underlayColor = selectedColor
      ? color(selectedColor)
          .fade(0.5)
          .rgb()
          .string()
      : selectedBackgroundColor;

    const accessibilityTraits: AccessibilityTrait[] = ['button'];
    const accessibilityState: AccessibilityState = {
      selected: false,
      disabled: false,
    };

    if (selected) {
      accessibilityTraits.push('selected');
      accessibilityState.selected = true;
    }

    if (disabled) {
      accessibilityTraits.push('disabled');
      accessibilityState.disabled = true;
    }

    return (
      <Elevation
        style={
          [
            styles.container,
            {
              elevation: Platform.OS === 'android' ? this.state.elevation : 0,
              backgroundColor: selected
                ? selectedBackgroundColor
                : backgroundColor,
              borderColor,
              borderRadius,
            },
            style,
          ] as StyleProp<ViewStyle>
        }
        {...rest}>
        <Touchable
          delayPressIn={0}
          style={{borderRadius}}
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          underlayColor={underlayColor}
          disabled={disabled}
          accessibilityLabel={accessibilityLabel}
          accessibilityTraits={accessibilityTraits}
          accessibilityComponentType="button"
          accessibilityRole="button"
          accessibilityState={accessibilityState}
          testID={testID}>
          <View style={styles.content}>
            {avatar && !icon ? (
              <View style={[styles.avatarWrapper, disabled && {opacity: 0.26}]}>
                {React.isValidElement(avatar)
                  ? React.cloneElement(avatar, {
                      style: [styles.avatar, avatar.props.style],
                    })
                  : avatar}
              </View>
            ) : null}
            {icon || selected ? (
              <View
                style={[
                  styles.icon,
                  avatar ? [styles.avatar, styles.avatarSelected] : null,
                ]}>
                <Icon
                  name={icon || 'check'}
                  color={avatar ? white : iconColor}
                  size={18}
                />
              </View>
            ) : null}
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {
                  ...theme.fonts.regular,
                  color: textColor,
                  marginRight: onClose ? 4 : 8,
                  marginLeft: avatar || icon || selected ? 4 : 8,
                },
                textStyle,
              ]}>
              {children}
            </Text>
            {onClose ? (
              <IconButton
                onPress={onClose}
                icon="close"
                size={16}
                color={iconColor}
              />
            ) : null}
          </View>
        </Touchable>
      </Elevation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  icon: {
    padding: 4,
  },
  text: {
    minHeight: 24,
    lineHeight: 24,
    textAlignVertical: 'center',
    marginVertical: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  avatarWrapper: {
    marginRight: 4,
  },
  avatarSelected: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, .29)',
  },
});

export default withTheme(Chip);
