import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {DISPLAYNAME_PREFIX} from '../../constants';

type State = {
  portals: Array<{
    key: number;
    children: React.ReactNode;
  }>;
};

/**
 * Portal host is the component which actually renders all Portals.
 */
export default class PortalManager extends React.PureComponent<{}, State> {
  public static displayName = `${DISPLAYNAME_PREFIX}.Portal.Manager`;

  public state: State = {
    portals: [],
  };

  public mount = (key: number, children: React.ReactNode) => {
    this.setState(state => ({
      portals: [...state.portals, {key, children}],
    }));
  };

  public update = (key: number, children: React.ReactNode) =>
    this.setState(state => ({
      portals: state.portals.map(item => {
        if (item.key === key) {
          return {...item, children};
        }
        return item;
      }),
    }));

  public unmount = (key: number) =>
    this.setState(state => ({
      portals: state.portals.filter(item => item.key !== key),
    }));

  public render() {
    return this.state.portals.map(({key, children}) => (
      <View
        key={key}
        collapsable={
          false /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */
        }
        pointerEvents="box-none"
        style={StyleSheet.absoluteFill}>
        {children}
      </View>
    ));
  }
}
