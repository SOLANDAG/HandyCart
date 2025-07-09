import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../types/navigation';

import { login } from '../components/registration/auth_service';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const handleLogin = async () => {
        try {
            const { profile } = await login(email, password);
            Alert.alert('Success', `You are logged in! Welcome ${profile?.username || 'Guest'}`);
            
            // move to home
            navigation.navigate('Home');
        
        } catch (error: any) {
            Alert.alert('Login failed', error.message);
        }
    
    };

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
        />

        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <Button title="Login" onPress={handleLogin} />

        <Button title="Register" onPress={() => navigation.navigate('Register')} />

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 100,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
});
