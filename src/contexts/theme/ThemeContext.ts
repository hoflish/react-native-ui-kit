import React from 'react';
import defaultTheme from '../../common/defaultTheme';
import {IThemeProps} from '../../common/types';

const ThemeContext = React.createContext<IThemeProps | undefined>(defaultTheme);

export default ThemeContext;
