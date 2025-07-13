import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Help() {
  const handleContactSupport = () => {
    Alert.alert('Contact Us', 'You can reach us at support@handycart.app 📩');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🛠️ How to Use HandyCart</Text>

      <View style={styles.section}>
        <Text style={styles.title}>📦 Placing an Order</Text>
        <Text style={styles.text}>
          Go to the <Text style={styles.bold}>Order</Text> tab, browse items, tap "Add to Cart", then check out.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>🛒 Viewing the Cart</Text>
        <Text style={styles.text}>
          Tap the <Text style={styles.bold}>Cart</Text> icon in the footer. You can edit or remove items before finalizing your order.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>💬 Talking to a Rider</Text>
        <Text style={styles.text}>
          Use the <Text style={styles.bold}>Chats</Text> tab to message your delivery rider in real-time.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>🚨 Emergency Alerts</Text>
        <Text style={styles.text}>
          Tap the <Text style={styles.bold}>SOS</Text> button in the footer to send an emergency SMS with your location.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>🎤 Voice Commands</Text>
        <Text style={styles.text}>
          Tap the 🎤 button on the upper right to start a voice command with the following format: {"\n"}
          - Add to cart: <Text style={styles.bold}>Add [optional amount] [item name]</Text> (Ex: Add apple or Add 2 eggs to cart){"\n"}
          - Reduce item from cart: <Text style={styles.bold}>Reduce [optional amount] [item name]</Text> (Ex: Reduce apple or Reduce 2 eggs from cart){"\n"}
          - Remove item: <Text style={styles.bold}>Remove [item name]</Text> (Ex: Remove apple){"\n"}
          - Navigation: <Text style={styles.bold}>Go [page name]</Text> (Ex: Go Home or Go to Cart){"\n"}
          - Send SOS: <Text style={styles.bold}>SOS</Text> (Ex: SOS or Send SOS){"\n"}
          - Logout: <Text style={styles.bold}>Logout</Text>
        </Text>
      </View>

      <View style={{ paddingBottom: 125 }}>
        <TouchableOpacity style={styles.supportBtn} onPress={handleContactSupport}>
          <Ionicons name="mail-outline" size={20} color="white" />
          <Text style={styles.supportText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EC',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: 'saddlebrown',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#654321',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: '600',
    color: 'saddlebrown',
  },
  supportBtn: {
    marginTop: 5,
    backgroundColor: 'saddlebrown',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
});