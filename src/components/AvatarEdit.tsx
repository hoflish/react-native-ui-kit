import React from 'react';
import {View} from 'react-native';
import Config from './Config';
import {DISPLAYNAME_PREFIX} from '../common/utils';
import {withTheme} from '../core/theming';
import Icon from './Icon';
import Touchable from "./Touchable";
import Avatar, {AvatarProps} from './Avatar';

interface AvatarEditProps extends AvatarProps {
  /**
   * Function to execute when image pressed
   */
  onPress: () => void;
}

class AvatarEdit extends React.Component<AvatarEditProps> {
  public static displayName = `${DISPLAYNAME_PREFIX}.AvatarEdit`;

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
      editBackgroundColor: colors.background,
      editIconColor: colors.text,
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
