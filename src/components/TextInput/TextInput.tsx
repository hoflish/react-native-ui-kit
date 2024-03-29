import React from 'react';
import {
  Animated,
  TextInput as NativeTextInput,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import {DISPLAYNAME_PREFIX} from '../../constants';
import TextInputOutlined from './TextInputOutlined';
import TextInputFlat from './TextInputFlat';
import {withTheme} from '../../core/theming';
import {RenderProps, State} from './types';
import {Theme} from '../../types';

export type TextInputProps = React.ComponentPropsWithRef<
  typeof NativeTextInput
> & {
  /**
   * Mode of the TextInput.
   * - `flat` - flat input with an underline.
   * - `outlined` - input with an outline.
   *
   * In `outlined` mode, the background color of the label is derived from
   * `colors.background` in theme or the `backgroundColor` style.
   * This component render TextInputOutlined or TextInputFlat based on that props
   */
  mode?: 'flat' | 'outlined';
  /**
   * If true, user won't be able to interact with the component.
   */
  disabled?: boolean;
  /**
   * The text to use for the floating label.
   */
  label?: string;
  /**
   * Placeholder for the input.
   */
  placeholder?: string;
  /**
   * Whether to style the TextInput with error style.
   */
  error?: boolean;
  /**
   * Callback that is called when the text input's text changes.
   * Changed text is passed as an argument to the callback handler.
   */
  onChangeText?: Function;
  /**
   * Selection color of the input
   */
  selectionColor?: string;
  /**
   * Underline color of the input.
   */
  underlineColor?: string;
  /**
   * Sets min height with densed layout. For `TextInput` in `flat` mode
   * height is `64dp` or in dense layout - `52dp` with label or `40dp` without label.
   * For `TextInput` in `outlined` mode
   * height is `56dp` or in dense layout - `40dp` regardless of label.
   * When you apply `heigh` prop in style the `dense` prop affects only `paddingVertical`
   * inside `TextInput`
   */
  dense?: boolean;
  /**
   * Whether the input can have multiple lines.
   */
  multiline?: boolean;
  /**
   * The number of lines to show in the input (Android only).
   */
  numberOfLines?: number;
  /**
   * Callback that is called when the text input is focused.
   */
  onFocus?: (args: any) => void;
  /**
   * Callback that is called when the text input is blurred.
   */
  onBlur?: (args: any) => void;
  /**
   *
   * Callback to render a custom input component such as `react-native-text-input-mask`
   * instead of the default `TextInput` component from `react-native`.
   *
   * Example:
   * ```js
   * <TextInput
   *   label="Phone number"
   *   render={props =>
   *     <TextInputMask
   *       {...props}
   *       mask="+[00] [000] [000] [000]"
   *     />
   *   }
   * />
   * ```
   */
  render: (props: RenderProps) => React.ReactNode;
  /**
   * Value of the text input.
   */
  value?: string;
  /**
   * Pass `fontSize` prop to modify the font size inside `TextInput`.
   * Pass `height` prop to set `TextInput` height. When `height` is passed,
   * `dense` prop will affect only input's `paddingVertical`.
   * Pass `paddingHorizontal` to modify horizontal padding.
   * This can be used to get MD Guidelines v1 TextInput look.
   */
  style?: any;
  /**
   * @optional
   */
  theme: Theme;
};

class TextInput extends React.Component<TextInputProps, State> {
  public static displayName = `${DISPLAYNAME_PREFIX}.TextInput`;

  public static readonly BLUR_ANIMATION_DURATION = 180;
  public static readonly FOCUS_ANIMATION_DURATION = 150;

  public static defaultProps: Partial<TextInputProps> = {
    mode: 'flat',
    dense: false,
    disabled: false,
    error: false,
    multiline: false,
    editable: true,
    render: (props: RenderProps) => <NativeTextInput {...props} />,
  };

  public static getDerivedStateFromProps(
    nextProps: TextInputProps,
    prevState: State,
  ) {
    return {
      value:
        typeof nextProps.value !== 'undefined'
          ? nextProps.value
          : prevState.value,
    };
  }

  public state = {
    labeled: new Animated.Value(
      (this.props.value !== undefined
      ? this.props.value
      : this.props.defaultValue)
        ? 0
        : 1,
    ),
    error: new Animated.Value(this.props.error ? 1 : 0),
    focused: false,
    placeholder: '',
    value:
      this.props.value !== undefined
        ? this.props.value
        : this.props.defaultValue,
    labelLayout: {
      measured: false,
      width: 0,
      height: 0,
    },
  };

  public ref: NativeTextInput | undefined | null;

  public componentDidUpdate(prevProps: TextInputProps, prevState: State) {
    if (
      prevState.focused !== this.state.focused ||
      prevState.value !== this.state.value ||
      prevState.labelLayout !== this.state.labelLayout
    ) {
      // The label should be minimized if the text input is focused, or has text
      // In minimized mode, the label moves up and becomes small
      if (this.state.value || this.state.focused) {
        this.minimizeLabel();
      } else {
        this.restoreLabel();
      }
    }

    if (
      prevState.focused !== this.state.focused ||
      prevProps.label !== this.props.label
    ) {
      // Show placeholder text only if the input is focused, or there's no label
      // We don't show placeholder if there's a label because the label acts as placeholder
      // When focused, the label moves up, so we can show a placeholder
      if (this.state.focused || !this.props.label) {
        this.showPlaceholder();
      } else {
        this.hidePlaceholder();
      }
    }

    if (prevProps.error !== this.props.error) {
      // When the input has an error, we wiggle the label and apply error styles
      if (this.props.error) {
        this.showError();
      } else {
        this.hideError();
      }
    }
  }

  public componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private showPlaceholder = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // Set the placeholder in a delay to offset the label animation
    // If we show it immediately, they'll overlap and look ugly
    this.timer = setTimeout(
      () =>
        this.setState({
          placeholder: this.props.placeholder,
        }),
      50,
    );
  };

  private hidePlaceholder = () =>
    this.setState({
      placeholder: '',
    });

  private timer?: NodeJS.Timeout;
  private root: NativeTextInput | undefined | null;

  private showError = () => {
    Animated.timing(this.state.error, {
      toValue: 1,
      duration: TextInput.FOCUS_ANIMATION_DURATION,
      useNativeDriver: Platform.select({
        ios: false,
        default: true,
      }),
    }).start(this.showPlaceholder);
  };

  private hideError = () => {
    Animated.timing(this.state.error, {
      toValue: 0,
      duration: TextInput.BLUR_ANIMATION_DURATION,
      useNativeDriver: Platform.select({
        ios: false,
        default: true,
      }),
    }).start();
  };

  private restoreLabel = () =>
    Animated.timing(this.state.labeled, {
      toValue: 1,
      duration: TextInput.FOCUS_ANIMATION_DURATION,
      useNativeDriver: Platform.select({
        ios: false,
        default: true,
      }),
    }).start();

  private minimizeLabel = () =>
    Animated.timing(this.state.labeled, {
      toValue: 0,
      duration: TextInput.BLUR_ANIMATION_DURATION,
      useNativeDriver: Platform.select({
        ios: false,
        default: true,
      }),
    }).start();

  private handleFocus = (args: any) => {
    if (this.props.disabled || !this.props.editable) {
      return;
    }

    this.setState({focused: true});

    if (this.props.onFocus) {
      this.props.onFocus(args);
    }
  };

  private handleBlur = (args: Object) => {
    if (this.props.disabled || !this.props.editable) {
      return;
    }

    this.setState({focused: false});

    if (this.props.onBlur) {
      this.props.onBlur(args);
    }
  };

  private handleChangeText = (value: string) => {
    if (!this.props.editable) {
      return;
    }

    this.setState({value});
    this.props.onChangeText && this.props.onChangeText(value);
  };

  private handleLayoutAnimatedText = (e: LayoutChangeEvent) => {
    this.setState({
      labelLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
        measured: true,
      },
    });
  };

  /**
   * @internal
   */
  public setNativeProps(args: Object) {
    return this.root && this.root.setNativeProps(args);
  }

  /**
   * Returns `true` if the input is currently focused, `false` otherwise.
   */
  public isFocused() {
    return this.root && this.root.isFocused();
  }

  /**
   * Removes all text from the TextInput.
   */
  public clear() {
    return this.root && this.root.clear();
  }

  /**
   * Focuses the input.
   */
  public focus() {
    return this.root && this.root.focus();
  }

  /**
   * Removes focus from the input.
   */
  public blur() {
    return this.root && this.root.blur();
  }

  public render() {
    const {mode, ...rest} = this.props as Omit<TextInputProps, 'ref'>;
    const TextInputMode =
      mode === 'outlined' ? TextInputOutlined : TextInputFlat;

    return (
      <TextInputMode
        {...rest}
        value={this.state.value}
        parentState={this.state}
        innerRef={(ref: any) => {
          this.root = ref;
        }}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChangeText={this.handleChangeText}
        onLayoutAnimatedText={this.handleLayoutAnimatedText}
      />
    );
  }
}

export default withTheme(TextInput);
