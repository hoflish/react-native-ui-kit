import React from 'react';
import {Image} from 'react-native';

import {IconSource} from './Icon';
import {DISPLAYNAME_PREFIX} from '../common/types';
import Config from './Config';

export interface AvatarProps {
  /**
   * Image source for the avatar
   */
  image: IconSource;

  /**
   * Size of avatar in width and height
   */
  size: number;

  /**
   * Styles
   */
  style?: any;
}

export default class Avatar extends React.PureComponent<AvatarProps, {}> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Avatar`;

  public static defaultProps = {
    image: Config.avatarImageUrl,
    size: Config.avatarImageSize,
  };

  render() {
    const {image, size, style} = this.props;
    const borderRadius = size / 2;
    return (
      <Image
        style={[{width: size, height: size, borderRadius}, style]}
        source={typeof image === 'string' ? {uri: image} : image}
        resizeMode="cover"
      />
    );
  }
}
