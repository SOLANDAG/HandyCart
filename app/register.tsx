import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { register } from '../components/registration/auth_service';


export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await register(email, password);
            Alert.alert("Success", "Account created!");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    return (
    <View style={{ padding: 20 }}>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Register" onPress={handleRegister} />
    </View>
    );
}
