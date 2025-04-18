import React from 'react';
import { StyleSheet, View, Text, Image, BackHandler, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect } from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import MainScreen from '../screens/MainScreen';
import AboutUs from '../screens/AboutUs';

const Drawer = createDrawerNavigator();

// Custom drawer content
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        {/* <Image 
          source={require('../assets/logo.png')} 
          style={styles.drawerLogo} 
          resizeMode="contain"
        /> */}
        <Text style={styles.drawerTitle}>INVISIBLE EYE</Text>
      </View>
      
      <DrawerItemList {...props} />
      
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Do you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#1E1E1E',
          width: 280,
        },
        drawerActiveTintColor: '#39FF14',
        drawerInactiveTintColor: '#FFFFFF',
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -20,
        },
        headerStyle: {
          backgroundColor: '#121212',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen 
        name="MainScreen" 
        component={MainScreen} 
        options={{
          title: 'Home',
          drawerIcon: ({color}) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="AboutUs" 
        component={AboutUs} 
        options={{
          title: 'About Us',
          drawerIcon: ({color}) => (
            <Icon name="account-group" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: '#1E1E1E',
  },
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginBottom: 10,
  },
  drawerLogo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  drawerTitle: {
    color: '#39FF14',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    marginTop: 20,
  },
  footerText: {
    color: '#999999',
    fontSize: 12,
    textAlign: 'center',
  }
});

export default DrawerNavigator;