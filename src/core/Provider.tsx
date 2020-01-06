import React from 'react';

import {ThemeProvider} from './theming';
import Portal from '../components/Portal/Portal';
import {Theme} from '../types';

interface Props {
  children: React.ReactNode;
  theme?: Theme;
}

export default class Provider extends React.Component<Props> {
  render() {
    return (
      <Portal.Host>
        <ThemeProvider theme={this.props.theme}>
          {this.props.children}
        </ThemeProvider>
      </Portal.Host>
    );
  }
}
