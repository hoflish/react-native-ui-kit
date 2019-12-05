import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Text} from 'react-native';

import Provider from '../Provider';
import Elevation from 'components/Elevation';

storiesOf('Elevation', module)
  .add('default', () => (
    <Provider>
      <Elevation>
        <Text style={{padding: 16}}>No Elevation</Text>
      </Elevation>
    </Provider>
  ))
  .add("with eleveatio set to '1'", () => (
    <Provider>
      <Elevation style={{elevation: 1}}>
        <Text style={{padding: 16}}>Elevation set to 1</Text>
      </Elevation>
    </Provider>
  ))
  .add("with elevation set to '3' and white background", () => (
    <Provider>
      <Elevation
        style={{elevation: 3, backgroundColor: 'white', borderRadius: 3}}>
        <Text style={{padding: 16}}>Elevation set to 3</Text>
      </Elevation>
    </Provider>
  ));
