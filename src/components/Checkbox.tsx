import React from 'react';
import {Platform} from 'react-native';
import {useTheme} from '../core/theming';
import {DISPLAYNAME_PREFIX} from '../common/utils';
import CheckboxAndroid from './CheckboxAndroid';
import CheckboxIOS from './CheckboxIOS';

export interface CheckboxProps {
  /**
   * Whether checkbox is checked
   */
  checked: boolean;

  /**
   * Whether checkbox is indeterminate
   */
  indeterminate?: boolean;

  /**
   * Whether checkbox is disabled.
   */
  disabled?: boolean;

  /**
   * Function to execute on press.
   */
  onPress?: () => void;

  /**
   * Custom color for unchecked checkbox.
   */
  uncheckedColor?: string;

  /**
   * Custom color for checked checkbox.
   */
  color?: string;

  /**
   * Custom color for the ripple effect
   */
  rippleColorOverride?: string;
}

const Checkbox: React.FC<CheckboxProps> = props => {
  const theme = useTheme();
  return Platform.OS === 'ios' ? (
    <CheckboxIOS {...props} theme={theme} />
  ) : (
    <CheckboxAndroid {...props} theme={theme} />
  );
};

Checkbox.displayName = `${DISPLAYNAME_PREFIX}.Checkbox`;

export default Checkbox;
