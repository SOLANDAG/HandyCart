import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../types/navigation';

import { register } from '../components/registration/auth_service';

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const isAlphanumeric = (str : string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(str);

    const handleRegister = async () => {
        if (!email || !username || !password || !confirmPassword) {
            Alert.alert("Error", "All fields are required. Please enter content on the empty fields and try again.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Password does not match.");
            return;
        }
        if (!isAlphanumeric(password)) {
            Alert.alert("Error", "Password must contain BOTH letters and numbers.");
            return;
        }

        try {
            const registerUser = await register(email, password, username);
            Alert.alert("Success", `Account created for ${registerUser.user.email}`);

            navigation.navigate('Login');
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}

const styles = {
  container: {
    padding: 20,
    marginTop: 100,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
  }
};
