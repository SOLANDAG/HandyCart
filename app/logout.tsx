import { useEffect } from 'react';
import { Alert } from 'react-native';
import { logout } from '../components/registration/auth_service';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../types/navigation';

export default function LogoutScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    useEffect(() => {
    const doLogout = async () => {
        try {
            // logout from firebase
            await logout();
            Alert.alert('Logged out', 'You have been logged out.');
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
    };

    doLogout();
    }, [navigation]);

    return null;
}
