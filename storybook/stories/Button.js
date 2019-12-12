import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Provider from '../Provider';
import {Button} from '../../src/';

storiesOf('Button', module)
  .addDecorator(story => (
    <Provider style={{alignSelf: 'stretch', margin: 20}}>{story()}</Provider>
  ))
  .add('default', () => <Button>Click me</Button>)
  .add('disabled', () => (
    <Button disabled={true} onPress={() => alert('button clicked')}>
      disabled
    </Button>
  ))
  .add('outline', () => <Button type="outline">outlined button</Button>)
  .add('outline [disabled]', () => (
    <Button disabled={true} type="outline">
      outline disabled button
    </Button>
  ))
  .add('with custom color', () => (
    <Button color="red">button with custom color</Button>
  ))
  .add('outline with custom color', () => (
    <Button type="outline" color="red">
      outline with custom color
    </Button>
  ))
  .add('with elevation', () => (
    <Button elevation={3}>button with elevation</Button>
  ))
  .add('outline with elevation', () => (
    <Button type="outline" elevation={3}>
      button with elevation
    </Button>
  ))
  .add('with overrided border radius', () => (
    <Button borderRadiusOverride={3}>button</Button>
  ))
  .add('outline with overrided border radius', () => (
    <Button type="outline" borderRadiusOverride={3}>
      Button
    </Button>
  ))
  .add('with loading', () => <Button loading={true}>loading...</Button>)
  .add('with icon', () => <Button icon={'star'}>Button</Button>)
  .add('with image icon', () => (
    <Button
      icon={{
        uri: 'https://icon-library.net/images/plus-icon/plus-icon-20.jpg',
      }}>
      Button
    </Button>
  ));
