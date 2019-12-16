import React from 'react';
import {Platform} from 'react-native';
import {withTheme} from '../core/theming';
import {Theme} from '../types';
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

  theme: Theme;
}

class Checkbox extends React.Component<CheckboxProps> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Checkbox`;

  // @component ./CheckboxAndroid.js
  private static Android = CheckboxAndroid;

  // @component ./CheckboxIOS.js
  private static IOS = CheckboxIOS;

  render() {
    return Platform.OS === 'ios' ? (
      <Checkbox.IOS {...this.props} />
    ) : (
      <Checkbox.Android {...this.props} />
    );
  }
}

export default withTheme(Checkbox);
