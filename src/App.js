import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from './navigators/Application';
import './translations';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from "./redux/store.js"
import { store } from "./redux/store.js"

export const queryClient = new QueryClient();
export const storage = new MMKV();


function App() {
	
	
    return (
		<Provider store={store}>
		<PersistGate persistor={persistor}>
				
			<QueryClientProvider client={queryClient}>
				<ThemeProvider storage={storage}>
					<ApplicationNavigator />
				</ThemeProvider>
			</QueryClientProvider>
		
		</PersistGate>
		</Provider>
		
	);
}
export default App;
