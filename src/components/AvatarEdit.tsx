import React from 'react';
import {View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Config from './Config';
import {DISPLAYNAME_PREFIX} from '../common/utils';
import {withTheme} from '../core/theming';
import Icon from './Icon';
import Avatar, {AvatarProps} from './Avatar';
import {grey300} from '../styles/colors';

interface AvatarEditProps extends AvatarProps {
  /**
   * Function to execute when image pressed
   */
  onPress: () => void;
}

class AvatarEdit extends React.Component<AvatarEditProps> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Avatar.Edit`;

  public static defaultProps = {
    onPress: () => {},
    size: Config.avatarImageSize,
  };

  public render() {
    const {
      source,
      size,
      onPress,
      style,
      theme: {colors},
    } = this.props;

    const colorStyles = {
      editBackgroundColor: grey300,
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
          <Avatar source={source} size={size} />
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
