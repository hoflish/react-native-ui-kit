import {Platform} from 'react-native';
import {IThemeColors} from './types';

const THEME_COLORS: IThemeColors = {
  primary: 'rgba(90, 69, 255, 1)',
  secondary: 'rgba(59, 201, 234, 1)',
  surface: 'rgba(255, 255, 255, 1)',
  background: 'rgba(251, 252, 253, 1)',
  error: 'rgba(255, 69, 100, 1)',
  divider: 'rgba(234, 237, 242, 1)',
  strong: 'rgba(18, 20, 44, 1)',
  medium: 'rgba(70, 78, 88, 1)',
  light: 'rgba(165, 173, 183, 1)',
  strongInverse: 'rgba(255, 255, 255, 1)',
  mediumInverse: 'rgba(255, 255, 255, 0.87)',
  lightInverse: 'rgba(255, 255, 255, 0.68)',
};

function colorWithAlpha(name: string = 'medium', opacity: number = 1): string {
  if (!THEME_COLORS[name]) {
    name = 'medium';
  }
  return THEME_COLORS[name].split(', 1)').join(`, ${opacity})`);
}

export default {
  colors: THEME_COLORS,
  disabledOpacity: 0.5,
  colorWithAlpha,
  spacing: {
    gutters: 16,
    text: 4,
    small: 8,
    medium: 12,
    large: 16,
  },
  borderRadius: {
    global: 6,
    button: 24,
  },
  typography: {
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
  },

  elevation: {
    0: {
      borderWidth: 0,
      borderColor: THEME_COLORS.medium,
      borderOpacity: 0,
      ...Platform.select({
        ios: {
          shadowColor: THEME_COLORS.medium,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        },
        android: {
          elevation: 0,
        },
      }),
    },
    1: {
      borderWidth: 0,
      borderColor: THEME_COLORS.medium,
      borderOpacity: 0.06,
      ...Platform.select({
        ios: {
          shadowColor: THEME_COLORS.medium,
          shadowOpacity: 0.06,
          shadowRadius: 4,
          shadowOffset: {
            height: 0,
            width: 2,
          },
        },
        android: {
          elevation: 1,
        },
      }),
    },
    2: {
      borderWidth: 0,
      borderColor: THEME_COLORS.medium,
      borderOpacity: 0,
      ...Platform.select({
        ios: {
          shadowColor: THEME_COLORS.medium,
          shadowOpacity: 0.5,
          shadowRadius: 3,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        },
        android: {
          elevation: 2,
        },
      }),
    },

    3: {
      borderWidth: 0,
      borderColor: THEME_COLORS.strong,
      borderOpacity: 0,
      ...Platform.select({
        ios: {
          shadowColor: THEME_COLORS.medium,
          shadowOpacity: 0.12,
          shadowRadius: 6,
          shadowOffset: {
            height: 0,
            width: 6,
          },
        },
        android: {
          elevation: 3,
        },
      }),
    },
  },
};
