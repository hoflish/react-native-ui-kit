import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Touchable from 'react-native-platform-touchable';

import Provider from '../Provider';
import {blue, grey} from '../../src/common/colors';
import {useTheme} from '../../src/contexts/theme';
import {Switch} from '../../src';

function Usage({initialOn = false, disabled, isControlled, onToggle}) {
  const [state, setState] = useState(initialOn);
  const {colors} = useTheme();

  useEffect(() => {
    onToggle && onToggle(state);
  }, [state]);

  function onChange(value) {
    setState(value);
  }

  if (!isControlled) {
    return (
      <Switch
        value={state}
        disabled={disabled}
        onValueChange={onChange}
        checkedColorOverride={blue[100]}
        thumbColorOverride={blue.A200}
      />
    );
  }

  return (
    <Touchable
      disabled={disabled}
      onPress={() => onChange(!state)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: disabled ? grey[100] : 'white',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: grey[200],
        borderTopColor: grey[200],
        paddingVertical: 12,
        paddingHorizontal: 12,
      }}>
      <>
        <Text
          style={{
            paddingRight: 8,
            color: disabled ? grey[500] : colors.strong,
          }}>
          Controlled Switch Component
        </Text>
        <Switch
          isControlled={isControlled}
          disabled={disabled}
          value={state}
          onValueChange={onChange}
          checkedColorOverride={blue[100]}
          thumbColorOverride={blue.A200}
        />
      </>
    </Touchable>
  );
}

storiesOf('Switch', module)
  .addDecorator(story => <Provider>{story()}</Provider>)
  .add('default', () => <Usage />)
  .add('disabled', () => <Usage disabled={true} />)
  .add('controlled componennt', () => <Usage isControlled={true} />)
  .add('controlled componennt [disabled]', () => (
    <Usage isControlled={true} disabled={true} />
  ));
