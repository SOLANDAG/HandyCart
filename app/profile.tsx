import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export default function EmergencyContactsScreen() {
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addContact = () => {
    if (!name || !phone) {
      Alert.alert('Missing Info', 'Please enter both name and phone number.');
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      phone,
    };

    setContacts([...contacts, newContact]);
    setName('');
    setPhone('');
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Address"
        value={userAddress}
        onChangeText={setUserAddress}
      />

      <Text style={[styles.title, { marginTop: 30 }]}>Emergency Contacts</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Contact Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Ionicons name="add-circle" size={30} color="green" />
        </TouchableOpacity>
      </View>

      {contacts.length === 0 ? (
        <Text style={styles.empty}>No emergency contacts yet.</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactCard}>
              <View>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteContact(item.id)}>
                <Ionicons name="trash" size={24} color="crimson" />
              </TouchableOpacity>
            </View>
          )}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  addButton: {
    padding: 5,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  contactName: { fontSize: 16, fontWeight: '600' },
  contactPhone: { fontSize: 14, color: '#555' },
  empty: { textAlign: 'center', color: '#888', marginTop: 30 },
});
