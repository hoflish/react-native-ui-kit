import React from 'react';
import {View} from 'react-native';

import {ThemeProvider} from '../src/contexts/theme';

export default class Provider extends React.Component {
  render() {
    const {children, style} = this.props;
    return (
      <ThemeProvider>
        <View style={style}>{children}</View>
      </ThemeProvider>
    );
  }
}
