import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import {withTheme} from '../core/theming';
import Config from './Config';
import {DISPLAYNAME_PREFIX} from '../constants';
import {Theme} from '../types';

type Props = {
  hasSafeArea?: boolean;
  scrollable?: boolean;
  style?: any;
  theme: Theme;
};

type themeStyleProps = {
  backgroundColor?: string;
};

class ScreenContainer extends React.Component<Props> {
  public static displayName = `${DISPLAYNAME_PREFIX}.ScreenContainer`;

  private renderScrollableSafeAreaView(themeStyles: themeStyleProps) {
    const {children, style} = this.props;
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: themeStyles.backgroundColor,
            paddingTop: Config.statusBarHeight,
          },
        ]}>
        <ScrollView
          style={themeStyles}
          contentContainerStyle={[
            {
              flexGrow: 1,
            },
            style,
          ]}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  private renderSafeAreaView(themeStyles: themeStyleProps) {
    const {children, style} = this.props;
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: themeStyles.backgroundColor,
            paddingTop: Config.statusBarHeight,
          },
        ]}>
        <View style={[styles.container, themeStyles, style]}>{children}</View>
      </SafeAreaView>
    );
  }

  private renderScrollView(themeStyles: themeStyleProps) {
    const {children, style} = this.props;
    return (
      <ScrollView
        style={[themeStyles]}
        contentContainerStyle={[
          {
            flexGrow: 1,
          },
          style,
        ]}>
        {children}
      </ScrollView>
    );
  }

  private renderView(themeStyles: themeStyleProps) {
    const {children, style} = this.props;
    return (
      <View style={[styles.container, themeStyles, style]}>{children}</View>
    );
  }

  public render() {
    const {
      theme: {colors},
      hasSafeArea,
      scrollable,
    } = this.props;

    const themeStyles = {
      backgroundColor: colors.background,
    };

    if (scrollable && hasSafeArea) {
      return this.renderScrollableSafeAreaView(themeStyles);
    }

    if (hasSafeArea) {
      return this.renderSafeAreaView(themeStyles);
    }

    if (scrollable) {
      return this.renderScrollView(themeStyles);
    }

    return this.renderView(themeStyles);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withTheme(ScreenContainer);
