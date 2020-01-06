import * as React from 'react';
import PortalConsumer from './PortalConsumer';
import PortalHost, {PortalContext, PortalMethods} from './PortalHost';
import {ThemeProvider, withTheme} from '../../core/theming';
import {Theme} from '../../types';
import {DISPLAYNAME_PREFIX} from '../../constants';

type Props = {
  /**
   * Content of the `Portal`.
   */
  children: React.ReactNode;
  /**
   * @optional
   */
  theme: Theme;
};

/**
 * Portal allows to render a component at a different place in the parent tree.
 * You can use it to render content which should appear above other elements, similar to `Modal`.
 * It requires a [`Portal.Host`](portal-host.html) component to be rendered somewhere in the parent tree.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Portal, Text } from '@hoflish/react-native-ui-kit';
 *
 * export default class MyComponent extends React.Component {
 *   render() {
 *     return (
 *       <Portal>
 *         <Text>This is rendered at a different place</Text>
 *       </Portal>
 *     );
 *   }
 * }
 * ```
 */
class Portal extends React.Component<Props> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Portal`;

  // @component ./PortalHost.tsx
  public static Host = PortalHost;

  public render() {
    const {children, theme} = this.props;

    return (
      <PortalContext.Consumer>
        {manager => (
          <PortalConsumer manager={manager as PortalMethods}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </PortalConsumer>
        )}
      </PortalContext.Consumer>
    );
  }
}

export default withTheme(Portal);
