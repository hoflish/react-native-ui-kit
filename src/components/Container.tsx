import React from 'react';
import {View, Image} from 'react-native';
import {useTheme} from '../core/theming';
import Elevation from './Elevation';
import {DISPLAYNAME_PREFIX} from '../common/utils';

const Container: React.FC<{}> = (props: any) => {
  const {
    useThemeGutterPadding,
    borderColor,
    borderWidth,
    backgroundColor,
    backgroundImage,
    backgroundImageResizeMode,
    elevation,
    style,
    children,
  } = props;

  const {spacing} = useTheme();

  const containerStyle = {
    paddingHorizontal: useThemeGutterPadding ? spacing.gutters : 0,
    backgroundColor,
    borderColor,
    borderWidth,
    width: '100%',
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
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
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
