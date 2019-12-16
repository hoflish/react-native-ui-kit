import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Rating} from '../../src/';
import {orange500} from '../../src/styles/colors';

function Usage({defaultRating, onRate = rate => alert(rate)}) {
  return <Rating onPress={onRate} size={45} />;
}

storiesOf('Rating', module)
  .add('default', () => <Rating />)
  .add('rating', () => <Rating defaultRating={2.5} size={24} />)
  .add('with more that 5 stars', () => (
    <Rating max={8} defaultRating={4.3} size={24} />
  ))
  .add('with custom color', () => (
    <Rating defaultRating={3} color={orange500} />
  ))
  .add('with star select', () => <Usage />);
