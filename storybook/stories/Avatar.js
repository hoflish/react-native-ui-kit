import React from 'react';
import {storiesOf} from '@storybook/react-native';

import {Avatar} from '../../src/';

const myGravatar =
  'https://en.gravatar.com/userimage/103629501/4837edc1e029432a934670ceb6c9d10a.jpg';

storiesOf('Avatar', module)
  .add('default', () => <Avatar />)
  .add('with custom size', () => <Avatar size={40} image={myGravatar} />);
