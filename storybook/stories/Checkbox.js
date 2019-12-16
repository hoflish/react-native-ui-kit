import React, {useState, useEffect} from 'react';
import {storiesOf} from '@storybook/react-native';
import {Checkbox} from '../../src/';

function Usage({onToggle}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    onToggle && onToggle(status);
  }, [on]);

  function onChange(on) {
    setOn(!on);
  }

  return <Checkbox checked={on} onPress={() => onChange(on)} />;
}
/*
function UsageWithList(props) {
  const initialState = [
    {id: 1, label: 'Apple'},
    {id: 2, label: 'Pear'},
    {id: 3, label: 'Orange'},
  ];

  function reducer(state, action) {
    switch (action.type) {
      case 'TOGGLE':
        return state.map(item => {
          if (item.id === action.id) {
            return {...item, checked: !item.checked};
          }
          return item;
        });
      case 'TOGGLE_ALL':
        const allChecked = state.every(item => !!item.checked);
        if (allChecked) {
          return state.map(item => ({...item, checked: false}));
        } else {
          return state.map(item => ({...item, checked: true}));
        }

      case 'CHECK_ALL':
        return state.map(item => ({...item, checked: true}));
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const allChecked = state.every(item => !!item.checked);
  const someChecked = state.some(item => !!item.checked);
  return (
    <View
      style={{
        width: 200,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 8,
        }}>
        <Checkbox
          checked={allChecked}
          indeterminate={!allChecked && someChecked}
          onPress={() => dispatch({type: 'TOGGLE_ALL'})}
        />
        <Text style={{fontSize: 18, fontWeight: 'bold', paddingLeft: 8}}>
          Fruits
        </Text>
      </View>
      <View style={{marginLeft: 20}}>
        {state.map(item => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 8,
            }}>
            <Checkbox
              checked={!!item.checked}
              onPress={() => dispatch({type: 'TOGGLE', id: item.id})}
            />
            <Text style={{fontSize: 18, fontWeight: 'bold', paddingLeft: 8}}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
*/
storiesOf('Checkbox', module)
  .add('checked', () => <Checkbox checked={true} />)
  .add('indeterminate', () => <Checkbox indeterminate={true} />)
  .add('unchecked', () => <Checkbox />)
  .add('disabled', () => <Checkbox disabled={true} />)
  .add('with onPress()', () => <Usage />);
