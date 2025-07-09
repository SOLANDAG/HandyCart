// App.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

export default function Text_to_Speech() {
  const [text, setText] = useState('');

  const speak = () => {
    if (text.trim()) {
      Speech.speak(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type something to speak..."
        onChangeText={setText}
        value={text}
      />
      <Button title="Speak" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
