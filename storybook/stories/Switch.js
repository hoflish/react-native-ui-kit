import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Touchable from 'react-native-platform-touchable';
import * as Colors from '../../src/styles/colors';
import {useTheme, Switch} from '../../src';
import Provider from '../Provider';

function Usage({
  initialOn = false,
  disabled,
  isControlled,
  onToggle = val => alert(val),
}) {
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
        checkedColorOverride={Colors.blue100}
        thumbColorOverride={Colors.blueA200}
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
        backgroundColor: disabled ? Colors.grey100 : 'white',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: Colors.grey200,
        borderTopColor: Colors.grey200,
        paddingVertical: 12,
        paddingHorizontal: 12,
      }}>
      <>
        <Text
          style={{
            paddingRight: 8,
            color: disabled ? Colors.grey500 : colors.strong,
          }}>
          Controlled Switch Component
        </Text>
        <Switch
          isControlled={isControlled}
          disabled={disabled}
          value={state}
          onValueChange={onChange}
          checkedColorOverride={Colors.blue100}
          thumbColorOverride={Colors.blueA200}
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
