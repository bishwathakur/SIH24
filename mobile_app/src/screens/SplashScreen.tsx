import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    
    // Navigate after timeout
    const timer = setTimeout(() => {
      navigation.navigate('DrawerNavigator' as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <Text style={styles.title}>INVISIBLE EYE</Text>
        <Text style={styles.subtitle}>Bird & Drone Detection</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    color: '#39FF14',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 18,
    opacity: 0.8,
  }
});

export default SplashScreen;