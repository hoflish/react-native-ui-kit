import React, {useEffect, useState} from 'react';
import {storiesOf} from '@storybook/react-native';
import {TextInput} from '../../src';

function Usage(props) {
  const [text, setText] = useState('messi');
  const _root = React.createRef();

  useEffect(() => {
    _root && _root.current.focus();
  });

  return (
    <TextInput
      ref={_root}
      value={text}
      onChangeText={value => setText(value)}
      label="Tel"
    />
  );
}

storiesOf('TextInput', module)
  .add('default', () => <TextInput />)
  .add('with label', () => <TextInput label="Your Name" />)
  .add('with placeholder', () => (
    <TextInput label={'Username'} placeholder="Hoflish" />
  ))
  .add('disabled', () => <TextInput placeholder="+212620429957" disabled />)
  .add('with error', () => <TextInput error label="Code" placeholder="1234" />)
  .add('with onChange', () => (
    <TextInput
      label="Enter you cover letter"
      onChangeText={value => alert(value)}
    />
  ))
  .add('with ref', () => <Usage />);
