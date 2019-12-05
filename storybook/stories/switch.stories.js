import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Touchable from 'react-native-platform-touchable';

import Provider from '../Provider';
import Switch from 'components/Switch';
import blue from 'common/colors/blue';

function Usage({initialOn, isControlled, onToggle = value => alert(value)}) {
  const [state, setState] = useState(initialOn);

  useEffect(() => {
    onToggle(state);
  }, [state]);

  function onChange(value) {
    setState(value);
  }

  if (!isControlled) {
    return (
      <Switch
        value={state}
        onValueChange={onChange}
        checkedColorOverride={blue[100]}
        thumbColorOverride={blue.A200}
      />
    );
  }

  return (
    <Provider style={{margin: 0, paddingTop: 16}}>
      <Touchable
        onPress={() => onChange(!state)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderBottomColor: '#eee',
          borderTopColor: '#eee',
          paddingVertical: 12,
          paddingHorizontal: 12,
        }}>
        <>
          <Text>Controlled Switch Component</Text>
          <Switch
            isControlled={true}
            value={state}
            onValueChange={onChange}
            checkedColorOverride={blue[100]}
            thumbColorOverride={blue.A200}
          />
        </>
      </Touchable>
    </Provider>
  );
}

storiesOf('Switch', module)
  .add('default', () => <Switch value={true} />)
  .add('disabled', () => <Switch disabled={true} />)
  .add('with value changing', () => <Usage initialOn={false} />)
  .add('controlled componennt', () => (
    <Usage initialOn={false} isControlled={true} />
  ));
