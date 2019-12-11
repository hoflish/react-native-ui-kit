import {AppRegistry} from 'react-native';
import {getStorybookUI, configure} from '@storybook/react-native';

import {name as appName} from '../app.json';
//import './rn-addons';

// import stories
const loaderFn = () => [
  //require('./stories/touchable.stories.js'),
  //require('./stories/icon.stories.js'),
  //require('./stories/elevation.stories.js'),
  //require('./stories/button.stories.js'),
  //require('./stories/switch.stories.js'),
  //require('./stories/fab.stories.js'),
  //require('./stories/avatar.stories.js'),
  require('./stories/divider.stories.js'),
  require('./stories/avatarEdit.stories.js'),
];

configure(loaderFn, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;
