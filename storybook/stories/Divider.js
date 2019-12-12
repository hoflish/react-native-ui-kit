import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Text} from 'react-native';

import {Divider} from '../../src/';
import {grey} from '../../src/common/colors';

function DividerDecorator(story) {
  return (
    <View style={{alignSelf: 'stretch', margin: 20}}>
      <Text style={{paddingVertical: 12}}>item 1</Text>
      {story()}
      <Text style={{paddingVertical: 12}}>item 2</Text>
    </View>
  );
}

storiesOf('Divider', module)
  .addDecorator(DividerDecorator)
  .add('default', () => <Divider />)
  .add('with custom color', () => <Divider color={grey[400]} />);
