import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Text} from 'react-native';
import {useTheme} from '../../src';
import Provider from '../Provider';

function ThemeColors(props) {
  const {colors} = useTheme();
  const _style = {width: 200, height: 30};

  return Object.entries(colors).map((color, key) => (
    <View
      key={key}
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <Text style={{width: 100}}>{color[0]}</Text>
      <View key={key} style={[_style, {backgroundColor: color[1]}]}>
        <Text>{color[1]}</Text>
      </View>
    </View>
  ));
}

storiesOf('Colors', module)
  .addDecorator(story => <Provider>{story()}</Provider>)
  .add('theme', () => <ThemeColors />);
