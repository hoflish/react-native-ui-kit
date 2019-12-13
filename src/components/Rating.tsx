import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableHighlight,
} from 'react-native';

import {withTheme} from '../contexts/theme';
import {DISPLAYNAME_PREFIX, IThemeProps} from '../common/types';
import Icon from './Icon';
import Config from './Config';

interface RatingProps {
  /**
   * Maximum number of stars to be displayed
   */
  max?: number;

  /**
   * Default number of stars to be filled in
   */
  defaultRating: number;

  /**
   * Size of the star icon
   */
  size?: number;

  /**
   * Color of the star
   */
  color?: string;

  /**
   * Function to execute when star pressed
   */
  onPress?: (index: number) => void;

  /**
   * Styles
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Theme
   */
  theme: IThemeProps;
}

type State = {rating: number};

class Rating extends React.PureComponent<RatingProps, State> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Rating`;

  public static defaultProps = {
    max: 5,
    defaultRating: 0,
    size: Config.ratingStarSize,
  };

  constructor(props: RatingProps) {
    super(props);

    this.state = {
      rating: props.defaultRating,
    };
  }

  private _onRate = (index: number): void => {
    const {onPress} = this.props;
    if (typeof onPress === 'function') onPress(index);

    this.setState({rating: index});
  };

  public render() {
    const {
      max,
      size,
      color,
      onPress,
      style,
      theme: {colors},
    } = this.props;
    const {rating} = this.state;
    const starColor = color || colors.primary;
    const ratingRounded = Math.round(rating * 2) / 2;

    return (
      <View style={[styles.container, style]}>
        {[...Array(max)].map((v, i) => (
          <TouchableHighlight
            disabled={!onPress}
            style={{width: size, height: size}}
            underlayColor={'transparent'}
            onPress={() => this._onRate(i + 1)}>
            <Icon
              key={i}
              name={ratingRounded - i === 0.5 ? 'star-half' : 'star'}
              size={size}
              color={ratingRounded > i ? starColor : colors.divider}
            />
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withTheme(Rating);
