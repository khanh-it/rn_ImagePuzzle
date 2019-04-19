//
import RN, { Dimensions } from 'react-native';
//
import ESS from 'react-native-extended-stylesheet';
//
// import xml2js from 'react-native-xml2js';
//
import Lang from './helpers/lang';
import { NavigationService } from './helpers/react-navigation';
//
// export * from './helpers/native-base';

// Init global styles
export * from './assets/css/styles';

// Configs
const configs = global.__DEV__
  ? require('./configs/env.dev.js')
  : require('./configs/env.live.js')
;

/**
 * Define project's global 
 */
Object.assign(global, {
  // create ref shortcut
  $g: global,
  // @var {Object}
  configs,
  // @var {Object} translate helper
  Lang,
  // @var {object} NavigationService
  navServTop: new NavigationService(),
  // @var {Object}
  utils: {
    // xml2js,
    Dimensions
  },
  // @var {Object}
  dimensions: {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen')
  },
  // @var {Object}
  ESS,
  // 
  RN
});
// Event Listener for orientation changes
Dimensions.addEventListener('change', (dimensions) => {
  Object.assign(global, { dimensions });
});

// export
export default global;
