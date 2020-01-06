import * as React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {DISPLAYNAME_PREFIX} from '../../constants';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types';
import Caption from './../Typography/Caption';
import Title from './../Typography/Title';

type Props = React.ComponentProps<typeof View> & {
  /**
   * Text for the title. Note that this will only accept a string or `<Text>`-based node.
   */
  title: React.ReactNode;
  /**
   * Style for the title.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Text for the subtitle. Note that this will only accept a string or `<Text>`-based node.
   */
  subtitle?: React.ReactNode;
  /**
   * Style for the subtitle.
   */
  subtitleStyle?: StyleProp<TextStyle>;
  /**
   * Callback which returns a React element to display on the left side.
   */
  left?: (props: {size: number}) => React.ReactNode;
  /**
   * Style for the left element wrapper.
   */
  leftStyle?: StyleProp<ViewStyle>;
  /**
   * Callback which returns a React element to display on the right side.
   */
  right?: (props: {size: number}) => React.ReactNode;
  /**
   * Style for the right element wrapper.
   */
  rightStyle?: StyleProp<ViewStyle>;
  /**
   * @internal
   */
  index?: number;
  /**
   * @internal
   */
  total?: number;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

class CardTitle extends React.Component<Props> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Card.Title`;

  public static readonly LEFT_SIZE = 40;

  public render() {
    const {
      left,
      leftStyle,
      right,
      rightStyle,
      subtitle,
      subtitleStyle,
      style,
      title,
      titleStyle,
    } = this.props;

    return (
      <View
        style={
          [
            styles.container,
            {height: subtitle || left || right ? 72 : 50},
            style,
          ] as StyleProp<ViewStyle>
        }>
        {left ? (
          <View style={[styles.left, leftStyle] as StyleProp<ViewStyle>}>
            {left({
              size: CardTitle.LEFT_SIZE,
            })}
          </View>
        ) : null}

        <View style={[styles.titles]}>
          {title ? (
            <Title
              style={
                [
                  styles.title,
                  {marginBottom: subtitle ? 0 : 2},
                  titleStyle,
                ] as StyleProp<TextStyle>
              }
              numberOfLines={1}>
              {title}
            </Title>
          ) : null}

          {subtitle ? (
            <Caption
              style={[styles.subtitle, subtitleStyle] as StyleProp<TextStyle>}
              numberOfLines={1}>
              {subtitle}
            </Caption>
          ) : null}
        </View>

        <View style={rightStyle}>{right ? right({size: 24}) : null}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
  },

  left: {
    justifyContent: 'center',
    marginRight: 16,
    height: CardTitle.LEFT_SIZE,
    width: CardTitle.LEFT_SIZE,
  },

  titles: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 50,
  },

  title: {
    minHeight: 30,
  },

  subtitle: {
    minHeight: 20,
    marginVertical: 0,
  },
});

export default withTheme(CardTitle);

// @component-docs ignore-next-line
export {CardTitle};
