import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View} from 'react-native';

import Icon from 'components/Icon';

const wrapperStyle = {flex: 1, alignItems: 'center', justifyContent: 'center'};

storiesOf('Icon', module)
  .add("without 'name' returns null", () => <Icon />)
  .add("with 'star' icon name", () => (
    <View style={wrapperStyle}>
      <Icon name="star" color="yellow" size={64} />
    </View>
  ))

  .add('with image as icon ', () => (
    <View style={wrapperStyle}>
      <Icon
        name={{
          uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
        }}
        size={64}
      />
    </View>
  ));
