import React from 'react';
import {useTheme} from '../core/theming';
import Config from './Config';
import IconButton from './IconButton';

type Props = {
  /**
   * Status of radio button
   */
  selected: boolean;
  /**
   * Custom color for radio button
   */
  color?: string;
  /**
   * Whether the radio button is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
};

const RadioButton: React.FC<Props> = ({selected, disabled, color, onPress}) => {
  const {colors} = useTheme();
  const radioButtonColor = color || colors.medium;

  function _onPress() {
    if (onPress) {
      onPress();
    }
  }

  return (
    <IconButton
      icon={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
      color={radioButtonColor}
      disabled={disabled}
      size={Config.buttonIconSize}
      onPress={_onPress}
    />
  );
};

export default RadioButton;
