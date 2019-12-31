import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colorLib from 'color';
import {withTheme} from '../core/theming';
import Touchable from './Touchable';
import RadioButton from './RadioButton';
import {Theme} from '../types';

type Props = {
  /**
   * Title to display alongside radio button
   */
  title?: string;
  /**
   * Status of radio button
   */
  selected: boolean;
  /**
   * Whether the radio button is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;

  style?: any;
  /**
   * @optional
   */
  theme: Theme;
};

class FieldRadioButton extends React.Component<Props> {
  onPress = () => {
    const {onPress} = this.props;

    if (onPress) {
      onPress();
    }
  };

  render() {
    const {
      title,
      selected,
      disabled,
      theme: {colors, fonts, spacing, disabledOpacity},
      style,
    } = this.props;

    let titleColor = selected ? colors.primary : colors.medium;

    if (disabled) {
      titleColor = colorLib(titleColor)
        .alpha(disabledOpacity)
        .rgb()
        .string();
    }

    return (
      <Touchable onPress={this.onPress} disabled={disabled}>
        <View style={[styles.container, style]}>
          <RadioButton
            color={titleColor}
            selected={selected}
            disabled={disabled}
          />
          <Text
            style={[
              fonts.regular,
              {color: titleColor, marginLeft: spacing.medium},
            ]}>
            {title}
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
});

export default withTheme(FieldRadioButton);
