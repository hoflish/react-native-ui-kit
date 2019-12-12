import React from 'react';
import {AppRegistry, View} from 'react-native';
import {getStorybookUI, configure, addDecorator} from '@storybook/react-native';

import {name as appName} from '../app.json';
//import './rn-addons';

const CenterDecorator = story => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    {story()}
  </View>
);

addDecorator(CenterDecorator);

function loadStories() {
  require('./stories/Touchable.js');
  require('./stories/Icon.js');
  require('./stories/Elevation.js');
  require('./stories/Button.js');
  require('./stories/Switch.js');
  require('./stories/Fab.js');
  require('./stories/Avatar.js');
  require('./stories/Divider.js');
  require('./stories/AvatarEdit.js');
}

configure(loadStories, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;
