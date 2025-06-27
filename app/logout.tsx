import { useEffect } from 'react';
import { Alert } from 'react-native';
import { logout } from '../components/registration/auth_service';
import { useNavigation } from '@react-navigation/native';

export default function LogoutScreen() {
    const navigation = useNavigation();

    useEffect(() => {
    const doLogout = async () => {
        try {
            // logout from firebase
            await logout();
            Alert.alert('Logged out', 'You have been logged out.');
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' as never }],
            });
        
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
    };

    doLogout();
    }, []);

    return null;
}
