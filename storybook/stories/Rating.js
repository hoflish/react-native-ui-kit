import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Rating} from '../../src/';
import {orange} from '../../src/common/colors';

function Usage({defaultRating, onRate = rate => alert(rate)}) {
  return <Rating defaultRating={defaultRating} onPress={onRate} size={45} />;
}

storiesOf('Rating', module)
  .add('default', () => <Rating />)
  .add('rating', () => <Rating defaultRating={2.5} size={24} />)
  .add('with custom color', () => <Rating defaultRating={3} color={orange[500]} />)
  .add('usage', () => <Usage defaultRating={2.5} />);
