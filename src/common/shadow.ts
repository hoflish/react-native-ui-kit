import {IThemeProps} from './types';

export default function shadow(elevation: number, theme: IThemeProps) {
  if (theme.elevation[elevation]) {
    const {borderOpacity, ...themeElevation} = theme.elevation[elevation];
    themeElevation.borderColor = theme.colorWithAlpha(
      themeElevation.borderColor,
      borderOpacity,
    );

    return themeElevation;
  } else return theme.elevation[0];
}
