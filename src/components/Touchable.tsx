import React from 'react';
import {
  View,
  TouchableOpacityProps,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import RNPlatformTouchable from 'react-native-platform-touchable';

export interface TouchableProps
  extends TouchableOpacityProps,
    TouchableHighlightProps,
    TouchableNativeFeedbackProps,
    TouchableWithoutFeedbackProps {
  children: React.ReactNode;
}

export default class Touchable extends RNPlatformTouchable<TouchableProps> {
  constructor(props: TouchableProps) {
    super(props);
  }

  render() {
    const {children, ...rest} = this.props;

    return (
      <RNPlatformTouchable {...rest}>
        <View>{children}</View>
      </RNPlatformTouchable>
    );
  }
}
