import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import type { DrawerParamList } from '../types/navigation';

import { login } from '../components/registration/auth_service';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const handleLogin = async () => {
    try {
      await login(email, password);

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Generated OTP:', otp);

      navigation.navigate('OTP', { otp });
    } catch (error: any) {
      alert(`Login failed: ${error.message}`);
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
      
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 10,
    gap: 10,
  }
});
