import React from 'react';
import {storiesOf} from '@storybook/react-native';
import AvatarEdit from 'components/AvatarEdit';
import {View} from 'react-native';

const myGravatar =
  'https://en.gravatar.com/userimage/103629501/4837edc1e029432a934670ceb6c9d10a.jpg';

storiesOf('AvatarEdit', module)
  .add('default', () => (
    <View style={{margin: 20}}>
      <AvatarEdit />
    </View>
  ))
  .add('with custom size', () => (
    <View>
      <AvatarEdit
        style={{alignSelf: 'center'}}
        size={120}
        image={myGravatar}
        onPress={() => alert('AvatarEdit pressed!')}
      />
    </View>
  ));
