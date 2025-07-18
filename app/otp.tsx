import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { DrawerParamList } from '../types/navigation';

export default function OTPScreen() {
  const route = useRoute();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { otp } = route.params as { otp: string };

  const [enteredOTP, setEnteredOTP] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    setMessage(
      `OTP Safety Check: You're trying to log in on a different device. If you're sure it's safe, use OTP ${otp
        .split('')
        .join(' - ')} to proceed.`
    );
    setShowNotification(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [otp, slideAnim]);

  const hideNotification = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowNotification(false);
    });
  };

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === '') {
      const newOTP = [...enteredOTP];
      newOTP[index] = text;
      setEnteredOTP(newOTP);

      if (text && index < 5) {
        inputs.current[index + 1]?.focus();
      }
      if (!text && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const verifyOTP = () => {
    const entered = enteredOTP.join('');
    if (entered === otp) {
      alert('OTP Verified! Redirecting to Home...');
      navigation.navigate('Home');
    } else {
      alert('Invalid OTP. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      {showNotification && (
        <Animated.View
          style={[
            styles.notificationBox,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.notificationText}>{message}</Text>
          <TouchableOpacity onPress={hideNotification} style={styles.doneButton}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <Text style={styles.title}>Verify OTP</Text>

      <View style={styles.card}>
        <Text style={styles.infoText}>Enter the 6-digit code sent to you</Text>
        <View style={styles.otpContainer}>
          {enteredOTP.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => {
                inputs.current[i] = ref;
              }}
              style={styles.otpBox}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              returnKeyType="done"
              textContentType="oneTimeCode"
              autoFocus={i === 0}
              selectTextOnFocus
            />
          ))}
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Verify OTP" onPress={verifyOTP} color="#4CAF50" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  notificationBox: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  notificationText: {
    color: '#eee',
    fontSize: 12,
    marginBottom: 10,
  },
  doneButton: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#444',
    borderRadius: 4,
  },
  doneText: {
    color: '#eee',
    fontSize: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 10,
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginHorizontal: 10,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 45,
    height: 55,
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    marginTop: 20,
    marginHorizontal: 40,
  },
});
