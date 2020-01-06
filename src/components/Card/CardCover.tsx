import * as React from 'react';
import {StyleSheet, View, ViewStyle, Image, StyleProp} from 'react-native';
import {withTheme} from '../../core/theming';
import {grey200} from '../../styles/colors';
import {Theme} from '../../types';
import {DISPLAYNAME_PREFIX} from '../../constants';

type Props = React.ComponentProps<typeof Image> & {
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

class CardCover extends React.Component<Props> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Card.Cover`;

  public render() {
    const {index, total, style, theme, ...rest} = this.props;
    const {borderRadius} = theme;

    let coverStyle;

    if (index === 0) {
      if (total === 1) {
        coverStyle = {
          borderRadius: borderRadius.global,
        };
      } else {
        coverStyle = {
          borderTopLeftRadius: borderRadius.global,
          borderTopRightRadius: borderRadius.global,
        };
      }
    } else if (typeof total === 'number' && index === total - 1) {
      coverStyle = {
        borderBottomLeftRadius: borderRadius.global,
      };
    }

    return (
      <View
        style={[styles.container, coverStyle, style] as StyleProp<ViewStyle>}>
        <Image {...rest} style={[styles.image, coverStyle]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 195,
    backgroundColor: grey200,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    padding: 16,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
});

export default withTheme(CardCover);

// @component-docs ignore-next-line
export {CardCover};
