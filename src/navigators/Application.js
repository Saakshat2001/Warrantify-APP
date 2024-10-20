import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Walkthrough, Startup , Login , SignUp , MainDashboard , ProductInfo} from '@/screens';
import { useTheme } from '@/theme';
import { store, persistor } from '../redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

const Stack = createStackNavigator();
function ApplicationNavigator() {
    const { variant, navigationTheme } = useTheme();
    return (<SafeAreaProvider>
		 <PersistGate persistor={persistor}>
		 <Provider store={store}>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Startup" component={Startup}/>
					<Stack.Screen name="Walkthrough" component={Walkthrough}/>
					<Stack.Screen name="Login" component={Login}/>
					<Stack.Screen name="SignUp" component={SignUp}/>
					<Stack.Screen name="MainDashboard" component={MainDashboard}/>
					<Stack.Screen name="ProductInfo" component={ProductInfo}/>
				</Stack.Navigator>
			</NavigationContainer>
			</Provider>
			</PersistGate>
		</SafeAreaProvider>);
}
export default ApplicationNavigator;
