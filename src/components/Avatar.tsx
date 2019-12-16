import React from 'react';
import {Image, View, StyleSheet, ImageSourcePropType} from 'react-native';
import {DISPLAYNAME_PREFIX} from '../common/utils';
import Config from './Config';
import {Theme} from '../types';
import {withTheme} from '../core/theming';

export interface AvatarProps {
  /**
   * Image to display for the `Avatar`.
   */
  source: string | ImageSourcePropType;

  /**
   * Size of the avatar.
   */
  size: number;
  style?: any;

  /**
   * @optional
   */
  theme: Theme;
}

class Avatar extends React.Component<AvatarProps> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Avatar`;

  public static defaultProps = {
    source: Config.avatarImageUrl,
    size: Config.avatarImageSize,
  };

  render() {
    const {source, size, style, theme} = this.props;
    const {colors} = theme;

    const {backgroundColor = colors.background} =
      StyleSheet.flatten(style) || {};

    return (
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
          },
          style,
        ]}>
        <Image
          style={{width: size, height: size, borderRadius: size / 2}}
          source={typeof source === 'string' ? {uri: source} : source}
        />
      </View>
    );
  }
}

export default withTheme(Avatar);
