import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, BackHandler, Alert } from 'react-native';

// Import your screen components
import MainScreen from './MainScreen';
import AboutUs from './AboutUs';

// Define the param list for type checking
type RootDrawerParamList = {
  MainScreen: undefined;
  AboutUs: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Do you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null, // Do nothing and stay in the app
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(), // Exit the app
        },
      ]);
      return true; // Prevent default back behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#212529', // Background color of the drawer
        },
        drawerActiveTintColor: '#39FF14', // Color of the active item
        drawerInactiveTintColor: 'white', // Color of the inactive items
        drawerLabelStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: '#000000', // Top header color
        },
        headerTintColor: 'white', // Top header text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ drawerLabel: 'About Us' }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawerNavigator;
