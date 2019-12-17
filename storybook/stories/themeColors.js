import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Text} from 'react-native';
import {useTheme} from '../../src';
import Provider from '../Provider';

function ThemeColors(props) {
  const {colors} = useTheme();
  const _style = {width: 200, height: 30};
  
  return Object.values(colors).map((color, key) => (
    <View key={key} style={[_style, {backgroundColor: color}]}>
      <Text>{color}</Text>
    </View>
  ));
}

storiesOf('Theme colors', module)
  .addDecorator(story => <Provider>{story()}</Provider>)
  .add('default', () => <ThemeColors />);
