import React from 'react';
import {View, Image, StyleSheet, ImageResizeMode} from 'react-native';
import {useTheme} from '../core/theming';
import Elevation from './Elevation';
import {DISPLAYNAME_PREFIX} from '../common/utils';

type Props = {
  useThemeGutterPadding?: boolean;
  bgColor?: string;
  backgroundImage?: string | number;
  backgroundImageResizeMode?: ImageResizeMode;
  elevation?: number;
  style?: any;
  children: React.ReactNode;
}

const Container: React.FC<Props> = props => {
  const {
    useThemeGutterPadding,
    bgColor,
    backgroundImage,
    backgroundImageResizeMode,
    elevation,
    style,
    children,
  } = props;

  const {colors, spacing} = useTheme();

  const containerStyle = {
    paddingHorizontal: useThemeGutterPadding ? spacing.gutters : 0,
    backgroundColor: bgColor || colors.surface,
    width: '100%',
    elevation: 0,
  };

  const Wrap = elevation ? Elevation : View;

  if (elevation) {
    containerStyle.elevation = elevation;
  }

  return (
    <Wrap style={[containerStyle, style]}>
      <React.Fragment>
        {backgroundImage ? (
          <Image
            source={
              typeof backgroundImage === 'string'
                ? {uri: backgroundImage}
                : backgroundImage
            }
            resizeMode={backgroundImageResizeMode}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: (style && style.borderRadius) || 0,
            }}
          />
        ) : null}
        {children}
      </React.Fragment>
    </Wrap>
  );
};

Container.displayName = `${DISPLAYNAME_PREFIX}.Container`;

export default Container;
