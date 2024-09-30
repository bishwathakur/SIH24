import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('DrawerNavigator' as never); 
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
          <Text style={styles.title}>INVISIBLE EYE</Text>
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212529',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#39FF14',
        letterSpacing: 1.8,
        fontSize: 54,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign:'center'
    },
    subtitle: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default SplashScreen;