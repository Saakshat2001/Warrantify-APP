/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()
if (__DEV__) {
	import('@/reactotron.config');
}


AppRegistry.registerComponent(appName, () => App);
