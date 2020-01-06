import React from 'react';
import {Platform} from 'react-native';
import {withTheme} from '../core/theming';
import {DISPLAYNAME_PREFIX} from '../constants';
import CheckboxAndroid from './CheckboxAndroid';
import CheckboxIOS from './CheckboxIOS';
import {Theme} from '../types';

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

  theme: Theme;
}

const Checkbox: React.FC<CheckboxProps> = props => {
  return Platform.OS === 'ios' ? (
    <CheckboxIOS {...props} />
  ) : (
    <CheckboxAndroid {...props} />
  );
};

Checkbox.displayName = `${DISPLAYNAME_PREFIX}.Checkbox`;

export default withTheme(Checkbox);
