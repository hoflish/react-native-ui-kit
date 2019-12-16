import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Text} from 'react-native';

import {Divider} from '../../src/';
import {white} from '../../src/styles/colors';

function DividerDecorator(story) {
  return (
    <View style={{width: 200, backgroundColor: white}}>
      <Text style={{padding: 12}}>item 1</Text>
      {story()}
      <Text style={{padding: 12}}>item 2</Text>
    </View>
  );
}

storiesOf('Divider', module)
  .addDecorator(DividerDecorator)
  .add('default', () => <Divider />)
  .add('with inset', () => <Divider inset={true} />);
