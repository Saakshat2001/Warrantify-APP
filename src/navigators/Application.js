import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Walkthrough, Startup , Login , SignUp , MainDashboard , ProductInfo , Account , ProductSelectionScreen ,
	BrandSelection , PurchaseDateScreen
} from '@/screens';
import { useTheme } from '@/theme';


const Stack = createStackNavigator();
function ApplicationNavigator() {
    const { variant, navigationTheme } = useTheme();
	console.log('aaya --------------------------------');
	
    return (<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Startup" component={Startup}/>
					<Stack.Screen name="Walkthrough" component={Walkthrough}/>
					<Stack.Screen name="Login" component={Login}/>
					<Stack.Screen name="SignUp" component={SignUp}/>
					<Stack.Screen name="MainDashboard" component={MainDashboard}/>
					<Stack.Screen name="ProductInfo" component={ProductInfo}/>
					<Stack.Screen name="Account" component={Account}/>
					<Stack.Screen name="ProductSelectionScreen" component={ProductSelectionScreen}/>
					<Stack.Screen name="BrandSelection" component={BrandSelection}/>
					<Stack.Screen name="PurchaseDateScreen" component={PurchaseDateScreen}/>
				</Stack.Navigator>
			</NavigationContainer>

		</SafeAreaProvider>);
}
export default ApplicationNavigator;
