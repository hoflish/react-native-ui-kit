import React from 'react';
import color from 'color';
import {
  Animated,
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FABGroup, {FABGroup as _FABGroup} from './FABGroup';
import CrossFadeIcon from '../CrossFadeIcon';
import Text from '../Typography/Text';
import {black, white} from '../../styles/colors';
import {withTheme} from '../../core/theming';
import {Theme, $RemoveChildren} from '../../types';
import {IconSource} from '../Icon';
import Elevation from '../Elevation';
import Touchable from '../Touchable';
import Config from '../Config';
import {DISPLAYNAME_PREFIX} from '../../constants';

type Props = $RemoveChildren<typeof Elevation> & {
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
   *  Whether FAB is mini-sized, used to create visual continuity with other elements. This has no effect if `label` is specified.
   */
  small?: boolean;
  /**
   * Custom color for the `FAB`.
   */
  color?: string;
  /**
   * Whether `FAB` is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Whether `FAB` is currently visible.
   */
  visible?: boolean;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

type State = {
  visibility: Animated.Value;
};

class FAB extends React.Component<Props, State> {
  public static displayName = `${DISPLAYNAME_PREFIX}.FAB`;

  // @component ./FABGroup.tsx
  public static Group = FABGroup;

  public static defaultProps = {
    visible: true,
  };

  public state = {
    visibility: new Animated.Value(this.props.visible ? 1 : 0),
  };

  public componentDidUpdate(prevProps: Props) {
    if (this.props.visible === prevProps.visible) {
      return;
    }

    if (this.props.visible) {
      Animated.timing(this.state.visibility, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(this.state.visibility, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }

  public render() {
    const {
      small,
      icon,
      label,
      accessibilityLabel = label,
      color: customColor,
      disabled,
      onPress,
      theme,
      style,
      visible,
      loading,
      ...rest
    } = this.props;
    const {visibility} = this.state;

    const disabledColor = color(theme.dark ? white : black)
      .alpha(0.12)
      .rgb()
      .string();

    const {backgroundColor = disabled ? disabledColor : theme.colors.primary} =
      StyleSheet.flatten(style) || {};

    let foregroundColor;

    if (typeof customColor !== 'undefined') {
      foregroundColor = customColor;
    } else if (disabled) {
      foregroundColor = color(theme.dark ? white : black)
        .alpha(0.32)
        .rgb()
        .string();
    } else {
      foregroundColor = !color(backgroundColor).isLight()
        ? white
        : 'rgba(0, 0, 0, .54)';
    }

    const fabStyle = label
      ? styles.extended
      : small
      ? styles.small
      : styles.standard;

    return (
      <Elevation
        {...rest}
        style={
          [
            {
              backgroundColor,
              opacity: visibility,
              transform: [
                {
                  scale: visibility,
                },
              ],
            },
            fabStyle,
            styles.container,
            disabled && styles.disabled,
            style,
          ] as StyleProp<ViewStyle>
        }
        pointerEvents={visible ? 'auto' : 'none'}>
        <Touchable
          onPress={onPress}
          disabled={disabled || loading}
          accessibilityLabel={accessibilityLabel}
          accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
          accessibilityComponentType="button"
          accessibilityRole="button"
          accessibilityStates={disabled ? ['disabled'] : []}
          style={styles.touchable}>
          <View style={[styles.content, fabStyle]} pointerEvents="none">
            {icon && loading !== true ? (
              <CrossFadeIcon
                source={icon}
                size={Config.buttonIconSize}
                color={foregroundColor}
              />
            ) : null}
            {loading ? (
              <ActivityIndicator size="small" color={foregroundColor} />
            ) : null}
            {label ? (
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  {color: foregroundColor, ...theme.fonts.medium},
                ]}>
                {label.toUpperCase()}
              </Text>
            ) : null}
          </View>
        </Touchable>
      </Elevation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignSelf: 'stretch',
    borderRadius: 28,
    elevation: 6,
  },
  touchable: {
    borderRadius: 28,
  },
  standard: {
    height: 56,
    width: 56,
  },
  small: {
    height: 40,
    width: 40,
  },
  extended: {
    height: 48,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginHorizontal: 8,
  },
  disabled: {
    elevation: 0,
  },
});

export default withTheme(FAB);
