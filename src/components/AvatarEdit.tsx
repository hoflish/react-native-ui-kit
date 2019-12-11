import React from 'react';
import {View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Avatar, {AvatarProps} from './Avatar';
import {IThemeProps, DISPLAYNAME_PREFIX} from 'common/types';
import {withTheme} from 'contexts/theme';
import Icon from './Icon';
import Config from './Config';
import {grey} from 'common/colors';

export interface AvatarEditProps extends AvatarProps {
  /**
   * Function to execute when image pressed
   */
  onPress: () => void;

  /**
   * Theme
   */
  theme: IThemeProps;
}

class AvatarEdit extends React.PureComponent<AvatarEditProps> {
  public static displayName = `${DISPLAYNAME_PREFIX}.AvatarEdit`;

  public static defaultProps = {
    onPress: () => {},
    size: Config.avatarImageSize,
  };

  public render() {
    const {
      image,
      size,
      onPress,
      style,
      theme: {colors},
    } = this.props;

    const colorStyles = {
      editBackgroundColor: grey[300],
      editIconColor: colors.strong,
      editBorderColor: colors.surface,
    };

    return (
      <Touchable
        style={[
          {
            width: size,
            height: size,
          },
          style,
        ]}
        onPress={onPress}>
        <View>
          <Avatar image={image} size={size} />
          <View
            style={{
              position: 'absolute',
              bottom: 2,
              right: -8,
              borderWidth: 2,
              borderColor: colorStyles.editBorderColor,
              backgroundColor: colorStyles.editBackgroundColor,
              borderRadius: size * (3 / 10),
              padding: size * (3 / 32),
            }}>
            <Icon
              name="photo-camera"
              color={colorStyles.editIconColor}
              size={size * (3 / 16)}
            />
          </View>
        </View>
      </Touchable>
    );
  }
}

export default withTheme(AvatarEdit);
