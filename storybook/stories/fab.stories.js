import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Provider from '../Provider';
import Fab from 'components/Fab';
import {orange} from 'common/colors';

const fabStyle = {
  position: 'absolute',
  margin: 16,
  bottom: 0,
};

// See Material Design guidelines of FAB on material.io

storiesOf('Fab', module)
  .add('default', () => (
    <Provider style={{marginVertical: 60}}>
      <Fab icon="add" onPress={() => alert('Fab button pressed!')} />
    </Provider>
  ))
  .add('disabled', () => (
    <Provider style={{marginVertical: 60}}>
      <Fab
        icon="add"
        disabled={true}
        onPress={() => alert('Fab button pressed!')}
      />
    </Provider>
  ))
  .add('extended', () => (
    <Provider style={{marginVertical: 60}}>
      <Fab
        type="extended"
        icon="check"
        label="SEE ALL RESULTS FOR MORE INSIGHT ABOUT OUR WORK"
        onPress={() => alert('Fab button pressed!')}
        style={{...fabStyle, right: 0, left: 0}}
      />
    </Provider>
  ))
  .add('on the bottom right with elevation', () => (
    <Provider style={{marginVertical: 60}}>
      <Fab
        icon="add"
        style={{...fabStyle, right: 0}}
        onPress={() => alert('Fab button pressed!')}
      />
    </Provider>
  ))
  .add('standard with custom color', () => (
    <Provider style={{marginVertical: 60}}>
      <Fab
        icon="add"
        color={orange.A700}
        style={{...fabStyle, right: 0}}
        onPress={() => alert('Fab button pressed!')}
      />
    </Provider>
  ));
