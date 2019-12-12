import React from 'react';
import {Platform} from 'react-native';

import {IThemeProps, DISPLAYNAME_PREFIX} from '../common/types';
import {withTheme} from '../contexts/theme';
import CheckboxAndroid from './CheckboxAndroid';

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

  /**
   * Theme
   */
  theme: IThemeProps;
}

class Checkbox extends React.Component<CheckboxProps> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Checkbox`;

  // @component ./CheckboxAndroid.js
  private static Android = CheckboxAndroid;

  // @component ./CheckboxIOS.js
  private static IOS = null; //CheckboxIOS;

  render() {
    return Platform.OS === 'ios' ? null : (
      //<CheckboxIOS {...this.props} />
      <Checkbox.Android {...this.props} />
    );
  }
}

export default withTheme(Checkbox);
