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

import {DISPLAYNAME_PREFIX} from '../../constants';
import InputLabel from './Label/InputLabel';
import LabelBackground from './Label/LabelBackground';
import Outline from './Outline';
import {RenderProps, ChildTextInputProps} from './types';

import {
  MAXIMIZED_LABEL_FONT_SIZE,
  MINIMIZED_LABEL_FONT_SIZE,
  LABEL_WIGGLE_X_OFFSET,
} from './_constants';

import {
  calculateLabelTopPosition,
  calculateInputHeight,
  calculatePadding,
  adjustPaddingOut,
  Padding,
  interpolatePlaceholder,
} from './helpers';

export default class TextInputOutlined extends React.Component<
  ChildTextInputProps,
  {}
> {
  public static displayName = `${DISPLAYNAME_PREFIX}.TextInputOutlined`;

  public static readonly OUTLINE_MINIMIZED_LABEL_Y_OFFSET = -6;
  public static readonly LABEL_PADDING_TOP = 8;
  public static readonly MIN_HEIGHT = 64;
  public static readonly MIN_DENSE_HEIGHT = 48;
  public static readonly INPUT_PADDING_HORIZONTAL = 14;

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
      // underlineColor,
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
      backgroundColor = colors.background,
      ...viewStyle
    } = (StyleSheet.flatten(style) || {}) as TextStyle;
    const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;

    let inputTextColor,
      activeColor,
      outlineColor,
      placeholderColor,
      errorColor,
      containerStyle;

    if (disabled) {
      inputTextColor = activeColor = color(colors.text)
        .alpha(0.54)
        .rgb()
        .string();
      placeholderColor = outlineColor = colors.disabled;
    } else {
      inputTextColor = colors.text;
      activeColor = error ? colors.error : colors.primary;
      placeholderColor = outlineColor = colors.medium;
      errorColor = colors.error;
    }

    const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
    const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;

    const labelWidth = parentState.labelLayout.width;
    const labelHeight = parentState.labelLayout.height;
    const labelHalfWidth = labelWidth / 2;
    const labelHalfHeight = labelHeight / 2;

    const baseLabelTranslateX =
      (I18nManager.isRTL ? 1 : -1) *
      (labelHalfWidth -
        (labelScale * labelWidth) / 2 -
        (fontSize - MINIMIZED_LABEL_FONT_SIZE) * labelScale);

    const minInputHeight =
      (dense
        ? TextInputOutlined.MIN_DENSE_HEIGHT
        : TextInputOutlined.MIN_HEIGHT) - TextInputOutlined.LABEL_PADDING_TOP;

    const inputHeight = calculateInputHeight(
      labelHeight,
      height,
      minInputHeight,
    );

    const topPosition = calculateLabelTopPosition(
      labelHeight,
      inputHeight,
      TextInputOutlined.LABEL_PADDING_TOP,
    );

    if (height && typeof height !== 'number') {
      // eslint-disable-next-line
      {
        console.warn('Currently we support only numbers in height prop');
      }

      const paddingSettings = {
        height: height ? +height : null,
        labelHalfHeight,
        offset: TextInputOutlined.LABEL_PADDING_TOP,
        multiline: multiline ? multiline : null,
        dense: dense ? dense : null,
        topPosition,
        fontSize,
        label,
        scale: fontScale,
        isAndroid: Platform.OS === 'android',
        styles: StyleSheet.flatten(
          dense ? styles.inputOutlinedDense : styles.inputOutlined,
        ) as Padding,
      };

      const pad = calculatePadding(paddingSettings);

      const paddingOut = adjustPaddingOut({...paddingSettings, pad});

      const baseLabelTranslateY =
        -labelHalfHeight -
        (topPosition + TextInputOutlined.OUTLINE_MINIMIZED_LABEL_Y_OFFSET);

      const placeholderOpacity = interpolatePlaceholder(
        parentState.labeled,
        hasActiveOutline,
      );

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
        hasActiveOutline,
        activeColor,
        placeholderColor,
        backgroundColor,
        errorColor,
      };

      const minHeight =
        height ||
        (dense
          ? TextInputOutlined.MIN_DENSE_HEIGHT
          : TextInputOutlined.MIN_HEIGHT);

      return (
        <View style={[containerStyle, viewStyle]}>
          {/*
          Render the outline separately from the container
          This is so that the label can overlap the outline
          Otherwise the border will cut off the label on Android
          */}
          <View>
            <Outline
              theme={theme}
              hasActiveOutline={hasActiveOutline}
              activeColor={activeColor}
              outlineColor={outlineColor}
              backgroundColor={backgroundColor}
            />
            <View
              style={{
                paddingTop: TextInputOutlined.LABEL_PADDING_TOP,
                paddingBottom: 0,
                minHeight,
              }}>
              <InputLabel
                parentState={parentState}
                labelProps={labelProps}
                labelBackground={LabelBackground}
              />
              {render({
                ...rest,
                ref: innerRef,
                onChangeText,
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
                  !multiline || (multiline && height)
                    ? {height: inputHeight}
                    : {},
                  paddingOut,
                  {
                    ...font,
                    fontSize,
                    fontWeight,
                    color: inputTextColor,
                    textAlignVertical: multiline ? 'top' : 'center',
                  },
                ],
              } as RenderProps)}
            </View>
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
    paddingHorizontal: TextInputOutlined.INPUT_PADDING_HORIZONTAL,
  },
  input: {
    flexGrow: 1,
    paddingHorizontal: TextInputOutlined.INPUT_PADDING_HORIZONTAL,
    margin: 0,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    zIndex: 1,
  },
  inputOutlined: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  inputOutlinedDense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
});
