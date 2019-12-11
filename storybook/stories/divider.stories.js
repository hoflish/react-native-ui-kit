import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Divider from 'components/Divider';
import {View, Text} from 'react-native';
import {grey} from 'common/colors';

storiesOf('Divider', module)
  .add('default', () => (
    <View style={{margin: 20}}>
      <Text style={{paddingVertical: 8}}>item 1</Text>
      <Divider />
      <Text style={{paddingVertical: 8}}>item 2</Text>
    </View>
  ))
  .add('with custom color', () => (
    <View style={{margin: 20}}>
      <Text style={{paddingVertical: 8}}>item 1</Text>
      <Divider color={grey[300]} />
      <Text style={{paddingVertical: 8}}>item 2</Text>
    </View>
  ));
