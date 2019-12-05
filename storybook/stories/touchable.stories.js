import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Text, View, StyleSheet} from 'react-native';

import Touchable from 'react-native-platform-touchable';

storiesOf('Touchable', module)
  .add('default', () => (
    <View style={styles.wrapper}>
      <Touchable style={styles.custom} onPress={() => alert('button clicked')}>
        <Text>touchable</Text>
      </Touchable>
    </View>
  ))
  .add('with background for borderless selectable elements [android]', () => (
    <View style={styles.wrapper}>
      <Touchable
        style={styles.custom}
        background={Touchable.SelectableBackgroundBorderless()}>
        <Text>touchable</Text>
      </Touchable>
    </View>
  ))
  .add('with ripple drawable with specified color', () => (
    <View style={styles.wrapper}>
      <Touchable
        style={styles.custom}
        background={Touchable.Ripple('red', false)}>
        <Text>touchable</Text>
      </Touchable>
    </View>
  ));

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  custom: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#dfdfdf',
    borderRadius: 3,
  },
});
