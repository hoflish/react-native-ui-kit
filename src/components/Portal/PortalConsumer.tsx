import * as React from 'react';
import {PortalMethods} from './PortalHost';
import {DISPLAYNAME_PREFIX} from '../../constants';

type Props = {
  manager: PortalMethods;
  children: React.ReactNode;
};

export default class PortalConsumer extends React.Component<Props> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Portal.Consumer`;

  public async componentDidMount() {
    this.checkManager();

    // Delay updating to prevent React from going to infinite loop
    await Promise.resolve();

    this.key = this.props.manager.mount(this.props.children);
  }

  public componentDidUpdate() {
    this.checkManager();

    this.props.manager.update(this.key, this.props.children);
  }

  public componentWillUnmount() {
    this.checkManager();

    this.props.manager.unmount(this.key);
  }

  private key: any;

  private checkManager() {
    if (!this.props.manager) {
      throw new Error(
        'Looks like you forgot to wrap your root component with `Provider` component from `@hoflish/react-native-ui-kit`.',
      );
    }
  }

  public render() {
    return null;
  }
}
