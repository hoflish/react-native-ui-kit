import React from 'react';
import {ThemeProvider} from 'contexts/theme';
import {View, StyleSheet} from 'react-native';

export default class Provider extends React.Component {
  render() {
    const {children, theme} = this.props;
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.wrapper}>{children}</View>
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
