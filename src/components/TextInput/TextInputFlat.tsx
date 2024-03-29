import React from 'react';
import {
  View,
  TextInput as NativeTextInput,
  StyleSheet,
  I18nManager,
  Platform,
  TextStyle,
} from 'react-native';
import color from 'color';
import InputLabel from './Label/InputLabel';
import Underline from './Underline';
import {RenderProps, ChildTextInputProps} from './types';

import {
  MAXIMIZED_LABEL_FONT_SIZE,
  MINIMIZED_LABEL_FONT_SIZE,
  LABEL_WIGGLE_X_OFFSET,
  LABEL_PADDING_HORIZONTAL,
} from './_constants';

import {
  calculateLabelTopPosition,
  calculateInputHeight,
  calculatePadding,
  adjustPaddingFlat,
  Padding,
  interpolatePlaceholder,
} from './helpers';
import {DISPLAYNAME_PREFIX} from '../../constants';

export default class TextInputFlat extends React.Component<
  ChildTextInputProps,
  {}
> {
  public static displayName = `${DISPLAYNAME_PREFIX}.TextInputFlat`;

  public static readonly MINIMIZED_LABEL_Y_OFFSET = -18;
  public static readonly LABEL_PADDING_TOP = 30;
  public static readonly LABEL_PADDING_TOP_DENSE = 24;
  public static readonly MIN_HEIGHT = 64;
  public static readonly MIN_DENSE_HEIGHT_WL = 52;
  public static readonly MIN_DENSE_HEIGHT = 40;
  public static readonly INPUT_OFFSET = 8;

  public static defaultProps = {
    disabled: false,
    error: false,
    multiline: false,
    editable: true,
    render: (props: RenderProps) => <NativeTextInput {...props} />,
  };

  public render(): any {
    const {
      disabled,
      editable,
      label,
      error,
      selectionColor,
      underlineColor,
      dense,
      style,
      theme,
      render,
      multiline,
      parentState,
      innerRef,
      onFocus,
      onBlur,
      onChangeText,
      onLayoutAnimatedText,
      ...rest
    } = this.props;

    const {colors, fonts} = theme;
    const font = fonts.regular;
    const hasActiveOutline = parentState.focused || error;

    const {
      fontSize: fontSizeStyle,
      fontWeight,
      height,
      paddingHorizontal,
      ...viewStyle
    } = (StyleSheet.flatten(style) || {}) as TextStyle;
    const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;
    const paddingOffset = (paddingHorizontal !== undefined &&
    typeof paddingHorizontal === 'number'
      ? {paddingHorizontal}
      : StyleSheet.flatten(styles.paddingOffset)) as {
      paddingHorizontal: number;
    };

    let inputTextColor,
      activeColor,
      underlineColorCustom,
      placeholderColor,
      errorColor;

    if (disabled) {
      inputTextColor = activeColor = color(colors.text)
        .alpha(0.54)
        .rgb()
        .string();
      placeholderColor = colors.disabled;
      underlineColorCustom = 'transparent';
    } else {
      inputTextColor = colors.text;
      activeColor = error ? colors.error : colors.primary;
      placeholderColor = colors.placeholder;
      errorColor = colors.error;
      underlineColorCustom = underlineColor || colors.disabled;
    }

    const containerStyle = {
      backgroundColor: theme.dark
        ? color(colors.background)
            .lighten(0.24)
            .rgb()
            .string()
        : color(colors.surface)
            .darken(0.06)
            .rgb()
            .string(),
      borderTopLeftRadius: theme.borderRadius.global,
      borderTopRightRadius: theme.borderRadius.global,
    };

    const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
    const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;

    const labelWidth = parentState.labelLayout.width;
    const labelHeight = parentState.labelLayout.height;
    const labelHalfWidth = labelWidth / 2;
    const labelHalfHeight = labelHeight / 2;

    const baseLabelTranslateX =
      (I18nManager.isRTL ? 1 : -1) *
        (labelHalfWidth - (labelScale * labelWidth) / 2) +
      (1 - labelScale) * paddingOffset.paddingHorizontal;

    const minInputHeight = dense
      ? (label
          ? TextInputFlat.MIN_DENSE_HEIGHT_WL
          : TextInputFlat.MIN_DENSE_HEIGHT) -
        TextInputFlat.LABEL_PADDING_TOP_DENSE
      : TextInputFlat.MIN_HEIGHT - TextInputFlat.LABEL_PADDING_TOP;

    const inputHeight = calculateInputHeight(
      labelHeight,
      height,
      minInputHeight,
    );

    const topPosition = calculateLabelTopPosition(
      labelHeight,
      inputHeight,
      multiline && height ? 0 : !height ? minInputHeight / 2 : 0,
    );

    if (height && typeof height !== 'number') {
      // eslint-disable-next-line
      {
        console.warn('Currently we support only numbers in height prop');
      }

      const paddingSettings = {
        height: height ? +height : null,
        labelHalfHeight,
        offset: TextInputFlat.INPUT_OFFSET,
        multiline: multiline ? multiline : null,
        dense: dense ? dense : null,
        topPosition,
        fontSize,
        label,
        scale: fontScale,
        isAndroid: Platform.OS === 'android',
        styles: StyleSheet.flatten(
          dense ? styles.inputFlatDense : styles.inputFlat,
        ) as Padding,
      };

      const pad = calculatePadding(paddingSettings);

      const paddingFlat = adjustPaddingFlat({
        ...paddingSettings,
        pad,
      });

      const baseLabelTranslateY =
        -labelHalfHeight -
        (topPosition + TextInputFlat.MINIMIZED_LABEL_Y_OFFSET);

      const placeholderOpacity = hasActiveOutline
        ? interpolatePlaceholder(parentState.labeled, hasActiveOutline)
        : parentState.labelLayout.measured
        ? 1
        : 0;

      const labelProps = {
        label,
        onLayoutAnimatedText,
        placeholderOpacity,
        error,
        placeholderStyle: styles.placeholder,
        baseLabelTranslateY,
        baseLabelTranslateX,
        font,
        fontSize,
        fontWeight,
        labelScale,
        wiggleOffsetX: LABEL_WIGGLE_X_OFFSET,
        topPosition,
        paddingOffset,
        hasActiveOutline,
        activeColor,
        placeholderColor,
        errorColor,
      };

      const minHeight =
        height ||
        (dense
          ? label
            ? TextInputFlat.MIN_DENSE_HEIGHT_WL
            : TextInputFlat.MIN_DENSE_HEIGHT
          : TextInputFlat.MIN_HEIGHT);

      const flatHeight =
        inputHeight +
        (!height
          ? dense
            ? TextInputFlat.LABEL_PADDING_TOP_DENSE
            : TextInputFlat.LABEL_PADDING_TOP
          : 0);

      return (
        <View style={[containerStyle, viewStyle]}>
          <Underline
            parentState={parentState}
            underlineColorCustom={underlineColorCustom}
            error={error}
            colors={colors}
            activeColor={activeColor}
          />
          <View
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              minHeight,
            }}>
            <InputLabel parentState={parentState} labelProps={labelProps} />

            {render?.({
              ...rest,
              ref: innerRef,
              onChangeText,
              // @ts-ignore
              placeholder: label
                ? parentState.placeholder
                : this.props.placeholder,
              placeholderTextColor: placeholderColor,
              editable: !disabled && editable,
              selectionColor:
                typeof selectionColor === 'undefined'
                  ? activeColor
                  : selectionColor,
              onFocus,
              onBlur,
              underlineColorAndroid: 'transparent',
              multiline,
              style: [
                styles.input,
                paddingOffset,
                !multiline || (multiline && height) ? {height: flatHeight} : {},
                paddingFlat,
                {
                  ...font,
                  fontSize,
                  fontWeight,
                  color: inputTextColor,
                  textAlignVertical: multiline ? 'top' : 'center',
                },
              ],
            })}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    left: 0,
  },
  input: {
    flexGrow: 1,
    margin: 0,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    zIndex: 1,
  },
  inputFlat: {
    paddingTop: 24,
    paddingBottom: 4,
  },
  inputFlatDense: {
    paddingTop: 22,
    paddingBottom: 2,
  },
  paddingOffset: {
    paddingHorizontal: LABEL_PADDING_HORIZONTAL,
  },
});
