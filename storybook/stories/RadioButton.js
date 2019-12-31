import React, {useState} from 'react';
import {storiesOf} from '@storybook/react-native';
import {RadioButton} from '../../src/';
import FieldRadioButton from '../../src/components/FieldRadioButton';

function Usage({type}) {
  const [on, setOn] = useState(false);

  if (type === 'field') {
    return (
      <FieldRadioButton
        title={'Paypal'}
        selected={on}
        onPress={() => setOn(!on)}
      />
    );
  }
  return <RadioButton selected={on} onPress={() => setOn(!on)} />;
}

storiesOf('RadioButton', module)
  .add('default', () => <Usage />)
  .add('field', () => <Usage type={'field'} />);
