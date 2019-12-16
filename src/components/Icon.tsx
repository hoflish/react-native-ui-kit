import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {DISPLAYNAME_PREFIX} from '../common/utils';

export type IconSource = string | {uri: string} | number;

interface Props {
  /**
   * Icon to display.
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
  style?: any;
}

let MaterialIcons: any;

try {
  // Optionally require vector-icons
  MaterialIcons = require('react-native-vector-icons/MaterialIcons').default;
} catch (e) {
  MaterialIcons = ({name, color, size, style, ...rest}: Props) => {
    // eslint-disable-next-line no-console
    console.warn(
      `Tried to use the icon '${name}' in a component from '[library]', but 'react-native-vector-icons' could not be loaded.`,
      `To remove this warning, try installing 'react-native-vector-icons' or use another method to specify icon.`,
    );

    return (
      <Text {...rest} style={[styles.icon, {color, fontSize: size}]}>
        □
      </Text>
    );
  };
}

const Icon: React.FC<Props> = ({
  name,
  color,
  size,
  style,
  ...rest
}): React.ReactElement | null => {
  if (name == null || typeof name === 'boolean') {
    return null;
  }

  if (typeof name === 'string') {
    return (
      <MaterialIcons
        name={name}
        color={color}
        size={size}
        style={style}
        {...rest}
      />
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
    <View
      {...rest}
      style={[
        {
          width: size,
          height: size,
        },
        styles.container,
        style,
      ]}>
      {name}
    </View>
  );
};

Icon.displayName = `${DISPLAYNAME_PREFIX}.Icon`;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    backgroundColor: 'transparent',
  },
});

export default Icon;
