import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Text, StyleSheet} from 'react-native';

import Touchable from 'react-native-platform-touchable';

storiesOf('Touchable', module)
  .add('default', () => (
    <Touchable style={styles.custom} onPress={() => alert('button clicked')}>
      <Text>touchable</Text>
    </Touchable>
  ))
  .add('with background for borderless selectable elements [android]', () => (
    <Touchable
      style={styles.custom}
      background={Touchable.SelectableBackgroundBorderless()}>
      <Text>touchable</Text>
    </Touchable>
  ))
  .add('with ripple drawable with specified color', () => (
    <Touchable
      style={styles.custom}
      background={Touchable.Ripple('red', false)}>
      <Text>touchable</Text>
    </Touchable>
  ));

const styles = StyleSheet.create({
  custom: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#dfdfdf',
    borderRadius: 3,
  },
});
