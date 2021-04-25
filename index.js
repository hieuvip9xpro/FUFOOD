/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {withAppContextProvider} from './components/GlobalContext'; // add this
AppRegistry.registerComponent(appName, () => withAppContextProvider(App));
