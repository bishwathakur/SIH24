import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export function notificationListener() {
    // Foreground message handler
    messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });

    // Killed state message handler
    messaging().getInitialNotification().then(remoteMessage => {
        if (remoteMessage) {
            console.log('Notification caused app to open from quit state:', remoteMessage);
        }
    });
}
