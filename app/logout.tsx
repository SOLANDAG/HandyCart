import { useEffect } from 'react';
import { Alert } from 'react-native';
import { auth } from '../firebase_config';
import { signOut } from 'firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function LogoutScreen() {
    const navigation = useNavigation();

    useEffect(() => {
    const doLogout = async () => {
        try {
            // logout from firebase
            await signOut(auth);
            Alert.alert('Logged out', 'You have been logged out.');
            
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Login' as never }],
            // });
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Login' as never}],
                })
            )
        
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
    };

    doLogout();
    }, []);

    return null;
}
