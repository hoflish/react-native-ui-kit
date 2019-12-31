import React, {useReducer} from 'react';
import {storiesOf} from '@storybook/react-native';
import Chip from '../../src/components/Chip';
import {View} from 'react-native';

const initialState = [
  {id: 1, label: 'chip1'},
  {id: 2, label: 'chip2'},
  {id: 3, label: 'chip3'},
];

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_SELECT':
      return state.map(item =>
        item.id === action.id ? {...item, selected: !item.selected} : item,
      );

    case 'REMOVE':
      return state.filter(item => item.id !== action.id);

    default:
      return state;
  }
}

function Usage(props) {
  const [chips, dispatch] = useReducer(reducer, initialState);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      {chips.map((elm, key) => (
        <Chip
          key={elm.id}
          mode="outlined"
          icon="add"
          selected={!!elm.selected}
          onClose={() => dispatch({type: 'REMOVE', id: elm.id})}
          onPress={() => dispatch({type: 'TOGGLE_SELECT', id: elm.id})}>
          {elm.label}
        </Chip>
      ))}
    </View>
  );
}

storiesOf('Chip', module).add('default', () => <Usage />);
