import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Provider from '../Provider';
import Button from 'components/Button';

storiesOf('Button', module)
  .add('default', () => (
    <Provider>
      <Button>Click me</Button>
    </Provider>
  ))
  .add('disabled', () => (
    <Provider>
      <Button disabled={true} onPress={() => alert('button clicked')}>
        disabled
      </Button>
    </Provider>
  ))
  .add('outline', () => (
    <Provider>
      <Button type="outline">outlined button</Button>
    </Provider>
  ))
  .add('outline [disabled]', () => (
    <Provider>
      <Button disabled={true} type="outline">
        outline disabled button
      </Button>
    </Provider>
  ))
  .add('with custom color', () => (
    <Provider>
      <Button color="red">button with custom color</Button>
    </Provider>
  ))
  .add('outline with custom color', () => (
    <Provider>
      <Button type="outline" color="red">
        outline with custom color
      </Button>
    </Provider>
  ))
  .add('with elevation', () => (
    <Provider>
      <Button elevation={3}>button with elevation</Button>
    </Provider>
  ))
  .add('outline with elevation', () => (
    <Provider>
      <Button type="outline">button with elevation</Button>
    </Provider>
  ))
  .add('with overrided border radius', () => (
    <Provider>
      <Button borderRadiusOverride={3}>button</Button>
    </Provider>
  ))
  .add('outline with overrided border radius', () => (
    <Provider>
      <Button type="outline" borderRadiusOverride={3}>
        Button
      </Button>
    </Provider>
  ))
  .add('with loading', () => (
    <Provider>
      <Button loading={true}>loading...</Button>
    </Provider>
  ))
  .add('with icon', () => (
    <Provider>
      <Button icon={'star'}>Button</Button>
    </Provider>
  ))
  .add('with image icon', () => (
    <Provider>
      <Button
        icon={{
          uri: 'https://icon-library.net/images/plus-icon/plus-icon-20.jpg',
        }}>
        Button
      </Button>
    </Provider>
  ));
