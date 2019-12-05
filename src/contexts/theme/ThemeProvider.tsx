import React from 'react';
import {IThemeProps} from 'common/types';
import ThemeContext from './ThemeContext';
import useTheme from './useTheme';

export type ThemeProviderProps = {
    children: React.ReactNode;
    theme?: IThemeProps;
};

function ThemeProvider({
    children,
    theme: localTheme,
}: ThemeProviderProps): React.ReactElement {
    const defaultTheme = useTheme();
    if (defaultTheme == null) {
        console.error(
            [
                'No default theme is present.',
                'Make sure a theme is already injected higher in the React tree ' +
                    'or provide a theme object.',
            ].join('\n'),
        );
    }

    const theme = React.useMemo(() => {
        const output =
            defaultTheme == null
                ? localTheme
                : {...defaultTheme, ...localTheme}; // TODO: check nested props

        return output;
    }, [localTheme, defaultTheme]);

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
}

export default ThemeProvider;
