import React from 'react';
import {View} from 'react-native';

import {ThemeProvider} from '../src/';

const Provider = ({theme, style, children}) => {
  return (
    <ThemeProvider theme={theme}>
      <View style={style}>{children}</View>
    </ThemeProvider>
  );
};

export default Provider;
