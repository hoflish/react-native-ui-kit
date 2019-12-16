import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {AvatarEdit} from '../../src/';

const myGravatar =
  'https://en.gravatar.com/userimage/103629501/4837edc1e029432a934670ceb6c9d10a.jpg';

storiesOf('AvatarEdit', module)
  .add('default', () => <AvatarEdit />)
  .add('with custom size', () => (
    <AvatarEdit
      size={120}
      image={myGravatar}
      onPress={() => alert('AvatarEdit pressed!')}
    />
  ));
