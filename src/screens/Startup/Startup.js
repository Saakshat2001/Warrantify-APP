import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { log } from 'console';

function Startup({ navigation }) {
    const { layout, gutters, fonts } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { t } = useTranslation(['startup']);
    const { isSuccess, isFetching, isError } = useQuery({
        queryKey: ['startup'],
        queryFn: () => {
            return Promise.resolve(true);
        },
    });
    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await AsyncStorage.getItem('isLoggedIn');
            console.log('logged in is ***************' , typeof(loggedIn));
            
            setIsLoggedIn(loggedIn);
            console.log('^^^^^^^^^^^^^^^^^^^^');
            
            if(loggedIn === 'true'){
                console.log('aaya +++++++=');
                
                navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'MainDashboard' }],
                }));
            }
            else{
                console.log('aaya +++++++= in else ');
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{ name: 'Walkthrough' }],
            }));
        }
            setLoading(false);
          };
      
        if (isSuccess) {
            checkLoginStatus();
            console.log('setIsLoggedIn --------->>>>>>>>>>>>>>>>>>>>> ', setIsLoggedIn );
        }
    }, [isSuccess]);
    return (<SafeScreen>
			<View style={[
            layout.flex_1,
            layout.col,
            layout.itemsCenter,
            layout.justifyCenter,
        ]}>
				<Brand />
				{isFetching && (<ActivityIndicator size="large" style={[gutters.marginVertical_24]}/>)}
				{isError && (<Text style={[fonts.size_16, fonts.red500]}>
						{t('startup:error')}
					</Text>)}
			</View>
		</SafeScreen>);
}
export default Startup;
