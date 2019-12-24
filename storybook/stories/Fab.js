import React from 'react';
import {storiesOf} from '@storybook/react-native';
import Provider from '../Provider';
import {Fab} from '../../src/';
import {greenA700} from '../../src/styles/colors';

const fabStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

storiesOf('Fab', module)
  .addDecorator(story => <Provider style={fabStyle}>{story()}</Provider>)
  .add('default', () => (
    <Fab icon="add" onPress={() => alert('Fab button pressed!')} />
  ))
  .add('disabled', () => (
    <Fab
      icon="add"
      disabled={true}
      onPress={() => alert('Fab button pressed!')}
    />
  ))
  .add('extended', () => (
    <Fab
      type="extended"
      icon="check"
      label="SEE ALL RESULTS FOR MORE INSIGHT ABOUT OUR WORK"
      onPress={() => alert('Fab button pressed!')}
    />
  ))

  .add('standard with custom color', () => (
    <Fab
      icon="add"
      color={greenA700}
      onPress={() => alert('Fab button pressed!')}
    />
  ));
