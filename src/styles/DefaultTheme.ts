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
};
