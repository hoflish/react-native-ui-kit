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
  .add("with eleveatio set to '1'", () => (
    <Elevation style={{elevation: 1}}>
      <Text style={{padding: 16}}>Elevation set to 1</Text>
    </Elevation>
  ))
  .add("with elevation set to '3' and white background", () => (
    <Elevation
      style={{elevation: 3, backgroundColor: 'white', borderRadius: 3}}>
      <Text style={{padding: 16}}>Elevation set to 3</Text>
    </Elevation>
  ));
