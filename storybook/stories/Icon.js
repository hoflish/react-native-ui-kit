import React from 'react';
import {storiesOf} from '@storybook/react-native';

import {Icon} from '../../src/';
import {orange} from '../../src/common/colors';

storiesOf('Icon', module)
  .add("without 'name' returns null", () => <Icon />)
  .add("with 'star' icon name", () => (
    <Icon name="star" color={orange[400]} size={64} />
  ))

  .add('with image as icon ', () => (
    <Icon
      name={{
        uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
      }}
      size={64}
    />
  ));
