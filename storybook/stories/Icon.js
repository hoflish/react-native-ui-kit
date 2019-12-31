import React from 'react';
import {storiesOf} from '@storybook/react-native';

import {Icon} from '../../src/';
import {blue500} from '../../src/styles/colors';

storiesOf('Icon', module)
  .add('with name', () => <Icon name="add" color={blue500} size={48} />)

  .add('with image icon ', () => (
    <Icon
      name={{
        uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
      }}
      size={64}
    />
  ));
