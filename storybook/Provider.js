import React from 'react';
import {ThemeProvider} from 'contexts/theme';
import {View, StyleSheet} from 'react-native';
import defaultTheme from 'common/defaultTheme';

export default class Provider extends React.Component {
  render() {
    const {children, style} = this.props;
    return (
      <ThemeProvider>
        <View style={[styles.wrapper, style]}>{children}</View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 16,
  },
});
