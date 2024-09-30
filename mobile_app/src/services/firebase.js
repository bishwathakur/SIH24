import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export async function getFCMToken() {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // Send this token to your Django backend
    }
    return fcmToken;
}

export function onTokenRefreshListener() {
    return messaging().onTokenRefresh(token => {
        console.log('New FCM Token:', token);
        // Send the new token to your Django backend
    });
}
