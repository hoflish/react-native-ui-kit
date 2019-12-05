// TODO: add typescript types

import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import useTheme from './useTheme';

const getDisplayName = (WrappedComponent: any) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withTheme = (WrappedComponent: any) => {
    if (WrappedComponent === undefined) {
        throw new Error(
            [
                'You are calling withTheme(WrappedComponent) with an undefined component.',
                'You may have forgotten to import it.',
            ].join('\n'),
        );
    }

    const WithTheme = React.forwardRef(function WithTheme(props, ref) {
        const theme = useTheme();
        return <WrappedComponent theme={theme} forwardedRef={ref} {...props} />;
    });

    WithTheme.displayName = `WithTheme(${getDisplayName(WrappedComponent)})`;

    hoistNonReactStatic(WithTheme, WrappedComponent);

    return WithTheme;
};

export default withTheme;
