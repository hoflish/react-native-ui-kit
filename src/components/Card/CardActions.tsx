import * as React from 'react';
import {StyleSheet, StyleProp, View, ViewStyle} from 'react-native';
import {DISPLAYNAME_PREFIX} from '../../constants';

type Props = React.ComponentProps<typeof View> & {
  /**
   * Items inside the `CardActions`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

class CardActions extends React.Component<Props> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Card.Actions`;

  public render() {
    const {style, ...rest} = this.props;
    return (
      <View {...rest} style={[styles.container, style] as StyleProp<ViewStyle>}>
        {React.Children.map(this.props.children, child =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                compact: child.props.compact !== false,
              })
            : child,
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
});

export default CardActions;
