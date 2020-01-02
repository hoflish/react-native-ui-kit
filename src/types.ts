export type Color = string;

export type Font = {
  fontFamily: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};

export type Fonts = {
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
};

export type ThemeColors = {
  primary: Color;
  secondary: Color;
  error: Color;
  text: Color;
  medium: Color;
  light: Color;
  background: Color;
  surface: Color;
  placeholder: Color;
  disabled: Color;
};

export type Spacing = {
  gutters: number;
  text: number;
  small: number;
  medium: number;
  large: number;
};

export type Theme = {
  dark: boolean;
  disabledOpacity: number;
  colors: ThemeColors;
  fonts: Fonts;
  spacing: Spacing;
  borderRadius: {
    global: number;
    button: number;
  };
};
