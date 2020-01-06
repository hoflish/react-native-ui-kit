import * as React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import Icon, {IconSource} from './Icon';

import {withTheme} from '../core/theming';
import {Theme} from '../types';

type Props = {
  /**
   * Icon to display for the `CrossFadeIcon`.
   */
  source: IconSource;
  /**
   * Color of the icon.
   */
  color: string;
  /**
   * Size of the icon.
   */
  size: number;
  /**
   * @optional
   */
  theme: Theme;
};

type State = {
  currentIcon: IconSource;
  previousIcon: IconSource | null;
  fade: Animated.Value;
};

class CrossFadeIcon extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, nextState: State) {
    if (nextState.currentIcon === nextProps.source) {
      return null;
    }

    return {
      currentIcon: nextProps.source,
      previousIcon: nextState.currentIcon,
    };
  }

  state: State = {
    currentIcon: this.props.source,
    previousIcon: null,
    fade: new Animated.Value(1),
  };

  componentDidUpdate(_: Props, prevState: State) {
    const {previousIcon} = this.state;
    const {
      theme: {
        animation: {scale},
      },
    } = this.props;

    if (
      !this.isValidIcon(previousIcon) ||
      this.isEqualIcon(previousIcon, prevState.previousIcon)
    ) {
      return;
    }

    this.state.fade.setValue(1);

    Animated.timing(this.state.fade, {
      duration: scale * 200,
      toValue: 0,
    }).start();
  }

  private getIconId(source: any) {
    if (
      typeof source === 'object' &&
      source !== null &&
      Object.prototype.hasOwnProperty.call(source, 'uri') &&
      typeof source.uri === 'string'
    ) {
      return source.uri;
    }

    return source;
  }

  private isImageSource = (source: any) => {
    // source is an object with uri
    return (
      (typeof source === 'object' &&
        source !== null &&
        Object.prototype.hasOwnProperty.call(source, 'uri') &&
        typeof source.uri === 'string') ||
      // source is a module, e.g. - require('image')
      typeof source === 'number'
    );
  };

  private isValidIcon = (source: any) =>
    typeof source === 'string' || this.isImageSource(source);

  private isEqualIcon = (a: any, b: any) =>
    a === b || this.getIconId(a) === this.getIconId(b);

  render() {
    const {color, size} = this.props;
    const opacityPrev = this.state.fade;
    const opacityNext = this.state.previousIcon
      ? this.state.fade.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        })
      : 1;

    const rotatePrev = this.state.fade.interpolate({
      inputRange: [0, 1],
      outputRange: ['-90deg', '0deg'],
    });

    const rotateNext = this.state.previousIcon
      ? this.state.fade.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-180deg'],
        })
      : '0deg';

    return (
      <View
        style={[
          styles.content,
          {
            height: size,
            width: size,
          },
        ]}>
        {this.state.previousIcon ? (
          <Animated.View
            style={[
              styles.icon,
              {
                opacity: opacityPrev,
                transform: [{rotate: rotatePrev}],
              },
            ]}>
            <Icon name={this.state.previousIcon} size={size} color={color} />
          </Animated.View>
        ) : null}
        <Animated.View
          style={[
            styles.icon,
            {
              opacity: opacityNext,
              transform: [{rotate: rotateNext}],
            },
          ]}>
          <Icon name={this.state.currentIcon} size={size} color={color} />
        </Animated.View>
      </View>
    );
  }
}

export default withTheme(CrossFadeIcon);

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
