import {PlatformStatic} from 'react-native';

export const DISPLAYNAME_PREFIX = 'HC';

export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

export interface IThemeColors {
  primary: string;
  secondary: string;
  surface: string;
  background: string;
  error: string;
  divider: string;
  strong: string;
  medium: string;
  light: string;
  strongInverse: string;
  mediumInverse: string;
  lightInverse: string;
  [propName: string]: string;
}

export interface ITypoStyle {
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface ITypography {
  headline1: ITypoStyle;
  headline2: ITypoStyle;
  headline3: ITypoStyle;
  headline4: ITypoStyle;
  headline5: ITypoStyle;
  headline6: ITypoStyle;
  subtitle1: ITypoStyle;
  subtitle2: ITypoStyle;
  body1: ITypoStyle;
  body2: ITypoStyle;
  button: ITypoStyle;
  caption: ITypoStyle;
  overline: ITypoStyle;
}

export interface ISpacing {
  gutters: number;
  text: number;
  small: number;
  medium: number;
  large: number;
}

export interface IBorderRadius {
  global: number;
  button: number;
}

// TODO: review this type
export interface IElevation {
  [propName: string]: any;
}

export interface IThemeProps {
  disabledOpacity: number;
  colors: IThemeColors;
  typography: ITypography;
  spacing: ISpacing;
  borderRadius: IBorderRadius;
  elevation: {
    [key: number]: IElevation;
  };
  colorWithAlpha: (name: string, opacity: number) => string;
}
