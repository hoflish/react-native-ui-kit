import Color from 'color';
import {white, black} from './colors';
import configureFonts from './fonts';

const THEME_COLORS = {
  primary: '#3d70b2',
  secondary: '#41d6c3',
  error: '#FF003C',
  text: 'black',
  medium: '#8c9ba5',
  light: '#dfe3e6',
  background: '#f5f7fa',
  surface: white,
  disabled: Color(black)
    .alpha(0.26)
    .rgb()
    .string(),
  placeholder: Color(black)
    .alpha(0.54)
    .rgb()
    .string(),
};

export default {
  dark: false,
  colors: THEME_COLORS,
  disabledOpacity: 0.5,
  spacing: {
    gutters: 16,
    text: 4,
    small: 8,
    medium: 12,
    large: 16,
  },
  borderRadius: {
    global: 4,
    button: 24,
  },
  fonts: configureFonts(),
  /*typography: {
    headline1: {
      fontFamily: 'System',
      fontWeight: '700',
      fontSize: 60,
      lineHeight: 71,
      letterSpacing: 0,
    },
    headline2: {
      fontFamily: 'System',
      fontWeight: '700',
      fontSize: 48,
      lineHeight: 58,
      letterSpacing: 0,
    },
    headline3: {
      fontFamily: 'System',
      fontWeight: '700',
      fontSize: 34,
      lineHeight: 40,
      letterSpacing: 0,
    },
    headline4: {
      fontFamily: 'System',
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 34,
      letterSpacing: 0,
    },
    headline5: {
      fontFamily: 'System',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 26,
      letterSpacing: 0,
    },
    headline6: {
      fontFamily: 'System',
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    subtitle1: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 26,
      letterSpacing: 0,
    },
    subtitle2: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 22,
      letterSpacing: 0,
    },
    body1: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 26,
      letterSpacing: 0,
    },
    body2: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 22,
      letterSpacing: 0,
    },
    button: {
      fontFamily: 'System',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 16,
      letterSpacing: 0,
    },
    caption: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
    },
    overline: {
      fontFamily: 'System',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 2,
    },
  },*/
};
