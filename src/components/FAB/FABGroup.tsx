import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import color from 'color';
import FAB from './FAB';
import Text from '../Typography/Text';
import Card from '../Card/Card';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types';
import {IconSource} from '../Icon';
import {DISPLAYNAME_PREFIX} from '../../constants';

type Props = {
  /**
   * Action items to display in the form of a speed dial.
   * An action item should contain the following properties:
   * - `icon`: icon to display (required)
   * - `label`: optional label text
   * - `accessibilityLabel`: accessibility label for the action, uses label by default if specified
   * - `color`: custom icon color of the action item
   * - `style`: pass additional styles for the fab item, for example, `backgroundColor`
   * - `onPress`: callback that is called when `FAB` is pressed (required)
   */
  actions: Array<{
    icon: IconSource;
    label?: string;
    color?: string;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
  }>;
  /**
   * Icon to display for the `FAB`.
   * You can toggle it based on whether the speed dial is open to display a different icon.
   */
  icon: IconSource;
  /**
   * Accessibility label for the FAB. This is read by the screen reader when the user taps the FAB.
   */
  accessibilityLabel?: string;
  /**
   * Custom color for the `FAB`.
   */
  color?: string;
  /**
   * Function to execute on pressing the `FAB`.
   */
  onPress?: () => void;
  /**
   * Whether the speed dial is open.
   */
  open: boolean;
  /**
   * Callback which is called on opening and closing the speed dial.
   * The open state needs to be updated when it's called, otherwise the change is dropped.
   */
  onStateChange: (state: {open: boolean}) => void;
  /**
   * Whether `FAB` is currently visible.
   */
  visible: boolean;
  /**
   * Style for the group. You can use it to pass additional styles if you need.
   * For example, you can set an additional padding if you have a tab bar at the bottom.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the FAB. It allows to pass the FAB button styles, such as backgroundColor.
   */
  fabStyle?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

type State = {
  backdrop: Animated.Value;
  animations: Animated.Value[];
};

class FABGroup extends React.Component<Props, State> {
  public static displayName = `${DISPLAYNAME_PREFIX}.FAB.Group`;

  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      animations: nextProps.actions.map(
        (_, i) =>
          prevState.animations[i] || new Animated.Value(nextProps.open ? 1 : 0),
      ),
    };
  }

  public state: State = {
    backdrop: new Animated.Value(0),
    animations: [],
  };

  public componentDidUpdate(prevProps: Props) {
    if (this.props.open === prevProps.open) {
      return;
    }

    if (this.props.open) {
      Animated.parallel([
        Animated.timing(this.state.backdrop, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.stagger(
          50,
          this.state.animations
            .map(animation =>
              Animated.timing(animation, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            )
            .reverse(),
        ),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(this.state.backdrop, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        ...this.state.animations.map(animation =>
          Animated.timing(animation, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ),
      ]).start();
    }
  }

  private close = () => this.props.onStateChange({open: false});

  private toggle = () => this.props.onStateChange({open: !this.props.open});

  public render() {
    const {
      actions,
      icon,
      open,
      onPress,
      accessibilityLabel,
      theme,
      style,
      fabStyle,
      visible,
    } = this.props;
    const {colors} = theme;

    const labelColor = theme.dark
      ? colors.text
      : color(colors.text)
          .fade(0.54)
          .rgb()
          .string();
    const backdropOpacity = open
      ? this.state.backdrop.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1, 1],
        })
      : this.state.backdrop;

    const opacities = this.state.animations;
    const scales = opacities.map(opacity =>
      open
        ? opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          })
        : 1,
    );

    return (
      <View
        pointerEvents="box-none"
        style={[styles.container, style] as StyleProp<ViewStyle>}>
        <TouchableWithoutFeedback onPress={this.close}>
          <Animated.View
            pointerEvents={open ? 'auto' : 'none'}
            style={[
              styles.backdrop,
              {
                opacity: backdropOpacity,
                backgroundColor: colors.backdrop,
              },
            ]}
          />
        </TouchableWithoutFeedback>
        <SafeAreaView pointerEvents="box-none" style={styles.safeArea}>
          <View pointerEvents={open ? 'box-none' : 'none'}>
            {actions.map((it, i) => (
              <View
                key={i} // eslint-disable-line react/no-array-index-key
                style={styles.item}
                pointerEvents="box-none">
                {it.label && (
                  <Card
                    style={
                      [
                        styles.label,
                        {
                          transform: [{scale: scales[i]}],
                          opacity: opacities[i],
                        },
                      ] as StyleProp<ViewStyle>
                    }
                    onPress={() => {
                      it.onPress();
                      this.close();
                    }}
                    accessibilityLabel={
                      it.accessibilityLabel !== 'undefined'
                        ? it.accessibilityLabel
                        : it.label
                    }
                    accessibilityTraits="button"
                    accessibilityComponentType="button"
                    accessibilityRole="button">
                    <Text style={{color: labelColor}}>{it.label}</Text>
                  </Card>
                )}
                <FAB
                  small
                  icon={it.icon}
                  color={it.color}
                  style={
                    [
                      {
                        transform: [{scale: scales[i]}],
                        opacity: opacities[i],
                        backgroundColor: theme.colors.surface,
                      },
                      it.style,
                    ] as StyleProp<ViewStyle>
                  }
                  onPress={() => {
                    it.onPress();
                    this.close();
                  }}
                  accessibilityLabel={
                    typeof it.accessibilityLabel !== 'undefined'
                      ? it.accessibilityLabel
                      : it.label
                  }
                  accessibilityTraits="button"
                  accessibilityComponentType="button"
                  accessibilityRole="button"
                />
              </View>
            ))}
          </View>
          <FAB
            onPress={() => {
              onPress?.();
              this.toggle();
            }}
            icon={icon}
            color={this.props.color}
            accessibilityLabel={accessibilityLabel}
            accessibilityTraits="button"
            accessibilityComponentType="button"
            accessibilityRole="button"
            style={[styles.fab, fabStyle] as StyleProp<ViewStyle>}
            visible={visible}
          />
        </SafeAreaView>
      </View>
    );
  }
}

export default withTheme(FABGroup);

// @component-docs ignore-next-line
export {FABGroup};

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'flex-end',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  fab: {
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 0,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  label: {
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  item: {
    marginHorizontal: 24,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
