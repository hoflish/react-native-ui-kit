import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Text} from 'react-native';

import Provider from '../Provider';
import {Elevation} from '../../src/';

storiesOf('Elevation', module)
  .addDecorator(story => <Provider>{story()}</Provider>)
  .add('default', () => (
    <Elevation>
      <Text style={{padding: 16}}>No Elevation</Text>
    </Elevation>
  ))
  .add("with elevation set to '1'", () => (
    <Elevation style={{elevation: 1}}>
      <Text style={{padding: 16}}>Elevation set to 1</Text>
    </Elevation>
  ))
  .add("with elevation set to '2'", () => (
    <Elevation style={{elevation: 2, borderRadius: 3}}>
      <Text style={{padding: 16}}>Elevation set to 2</Text>
    </Elevation>
  ));
