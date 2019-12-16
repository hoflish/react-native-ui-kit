export type Color = string;

export interface ThemeColors {
  primary: Color;
  secondary: Color;
  surface: Color;
  background: Color;
  error: Color;
  strong: Color;
  medium: Color;
  light: Color;
  strongInverse: Color;
  mediumInverse: Color;
  lightInverse: Color;
}

export interface TypoStyle {
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface Typography {
  headline1: TypoStyle;
  headline2: TypoStyle;
  headline3: TypoStyle;
  headline4: TypoStyle;
  headline5: TypoStyle;
  headline6: TypoStyle;
  subtitle1: TypoStyle;
  subtitle2: TypoStyle;
  body1: TypoStyle;
  body2: TypoStyle;
  button: TypoStyle;
  caption: TypoStyle;
  overline: TypoStyle;
}

export interface Spacing {
  gutters: number;
  text: number;
  small: number;
  medium: number;
  large: number;
}

export interface BorderRadius {
  global: number;
  button: number;
}

export interface Theme {
  dark: boolean;
  disabledOpacity: number;
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
}
