import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import DrawerNavigator from './screens/DrawerNavigator';
import Login from './screens/Login'
import Signup from './screens/Signup';
import Main from './screens/MainScreen';
import Details from './screens/Details';

// Create a native stack navigator
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen
        	name='SplashScreen'
			component={SplashScreen}
		/>
    	{/* <Stack.Screen
     		name='Login'
      		component={Login}
    	/> */}
		{/* <Stack.Screen
			name='Signup'
			component={Signup}
		/> */}
		<Stack.Screen
			name='DrawerNavigator'
			component={DrawerNavigator}
		/>
		<Stack.Screen
			name='Details'
			component={Details}
		/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
