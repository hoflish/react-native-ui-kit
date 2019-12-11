import React from 'react';
import {Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {DISPLAYNAME_PREFIX} from 'common/types';

export type IconSource = string | {uri: string} | number;

export interface IIconProps {
  /**
   * Icon to display
   */
  name: IconSource;

  /**
   * Color of the icon
   */
  color?: string;

  /**
   * Size of the icon
   */
  size?: number;

  /**
   * Styles
   */
  style?: any;
}

class Icon extends React.PureComponent<IIconProps> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Icon`;

  public render(): React.ReactElement | null {
    const {name, color, size, style, ...rest} = this.props;
    if (name == null || typeof name === 'boolean') {
      return null;
    }

    if (typeof name === 'string') {
      return (
        <MaterialIcons name={name} color={color} size={size} style={style} />
      );
    } else if (
      (typeof name === 'object' &&
        name !== null &&
        Object.prototype.hasOwnProperty.call(name, 'uri') &&
        typeof name.uri === 'string') ||
      typeof name === 'number'
    ) {
      return (
        <Image
          source={name}
          style={[{width: size, height: size, tintColor: color}, style]}
        />
      );
    }

    return (
      <Text style={[{color, fontSize: size}, style]} {...rest}>
        □
      </Text>
    );
  }
}

export default Icon;
