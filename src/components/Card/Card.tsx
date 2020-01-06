import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import CardContent from './CardContent';
import CardActions from './CardActions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CardCover, {CardCover as _CardCover} from './CardCover';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CardTitle, {CardTitle as _CardTitle} from './CardTitle';
import Elevation from '../Elevation';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types';

type Props = React.ComponentProps<typeof Elevation> & {
  /**
   * Resting elevation of the card which controls the drop shadow.
   */
  elevation?: number;
  /**
   * Function to execute on long press.
   */
  onLongPress?: () => void;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Content of the `Card`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
  /**
   * Pass down testID from card props to touchable
   */
  testID?: string;
  /**
   * Pass down accessible from card props to touchable
   */
  accessible?: boolean;
};

type State = {
  elevation: Animated.Value;
};

class Card extends React.Component<Props, State> {
  // @component ./CardContent.tsx
  public static Content = CardContent;
  // @component ./CardActions.tsx
  public static Actions = CardActions;
  // @component ./CardCover.tsx
  public static Cover = CardCover;
  // @component ./CardTitle.tsx
  public static Title = CardTitle;

  public static defaultProps = {
    elevation: 1,
  };

  public state: State = {
    // @ts-ignore
    elevation: new Animated.Value(this.props.elevation),
  };

  private handlePressIn = () => {
    Animated.timing(this.state.elevation, {
      toValue: 8,
      duration: 150,
    }).start();
  };

  private handlePressOut = () => {
    Animated.timing(this.state.elevation, {
      // @ts-ignore
      toValue: this.props.elevation,
      duration: 150,
    }).start();
  };

  public render() {
    const {
      children,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      elevation: cardElevation,
      onLongPress,
      onPress,
      style,
      theme,
      testID,
      accessible,
      ...rest
    } = this.props;
    const {elevation} = this.state;
    const {borderRadius} = theme;
    const total = React.Children.count(children);
    const siblings = React.Children.map(children, child =>
      React.isValidElement(child) && child.type
        ? (child.type as any).displayName
        : null,
    );
    return (
      <Elevation
        style={
          [{borderRadius: borderRadius.global, elevation}, style] as StyleProp<
            ViewStyle
          >
        }
        {...rest}>
        <TouchableWithoutFeedback
          delayPressIn={0}
          disabled={!(onPress || onLongPress)}
          onLongPress={onLongPress}
          onPress={onPress}
          onPressIn={onPress ? this.handlePressIn : undefined}
          onPressOut={onPress ? this.handlePressOut : undefined}
          testID={testID}
          accessible={accessible}>
          <View style={styles.innerContainer}>
            {React.Children.map(children, (child, index) =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    index,
                    total,
                    siblings,
                  })
                : child,
            )}
          </View>
        </TouchableWithoutFeedback>
      </Elevation>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    flexGrow: 1,
  },
});

export default withTheme(Card);
