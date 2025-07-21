import React, { useState, useEffect } from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';

import { db } from '../firebase_config';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { useUser } from '../components/context/UserContext';

interface Message {
  id: string;
  text: string;
  sender: string;
  receiver: string;
  createdAt?: any;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [newMessage, setNewMessage] = useState('');

  const { profile } = useUser();
  const user = profile?.username || 'Guest';
  const filteredMessages = messages.filter(
    (msg) => msg.sender === user || msg.receiver === user || msg.receiver === 'all'
  );

  // get chat history
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      setMessages(loadedMessages);
    });

    return unsubscribe;
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      sender: user,
      receiver: 'HandyCart Support',
      createdAt: serverTimestamp(),
    });

    setNewMessage('');

    // auto-generate reply after delay
    setTimeout(async () => {
      const supportReply = {
        text: "Thank you for reaching out! We apologize for the issue you're having, we'll assist you shortly.",
        sender: 'HandyCart Support',
        receiver: user,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'messages'), supportReply);
    }, 1500);
  };



  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === user ? styles.myMessage : styles.supportMessage,
      ]}
    >
      <Text style={styles.sender}>{item.sender}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.container}>
          <FlatList
            data={filteredMessages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 10 }}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
          />

          <View style={styles.inputContainer}>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              style={styles.input}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Button title="Send" onPress={handleSend} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 110, 
   },
  messageBubble: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  supportMessage: {
    backgroundColor: '#EEE',
    alignSelf: 'flex-start',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 12,
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
});
