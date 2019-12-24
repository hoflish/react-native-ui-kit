import React, {useReducer} from 'react';
import {storiesOf} from '@storybook/react-native';
import {Checkbox, FieldCheckbox} from '../../src/';

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
    default:
      return state;
  }
}

function Usage({onToggle}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return state.map(item => (
    <FieldCheckbox
      key={item.id}
      title={item.label}
      //disabled={item.id === 2}
      checked={!!item.checked}
      onPress={() => dispatch({type: 'TOGGLE', id: item.id})}
    />
  ));
}

storiesOf('Checkbox', module)
  .add('checked', () => <Checkbox checked={true} />)
  .add('indeterminate', () => <Checkbox indeterminate={true} />)
  .add('unchecked', () => <Checkbox />)
  .add('disabled', () => <Checkbox disabled={true} />)
  .add('FieldCheckbox', () => <Usage />);
