import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState({
    google: true,
    facebook: false,
    apple: true,
  });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleLinked = (provider: keyof typeof linkedAccounts) => {
    setLinkedAccounts((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  const handleDeleteAccount = () => {
    alert("Account deleted (not really)");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Password changed from "${oldPassword}" to "${newPassword}" (not really)`);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordChange(false);
  };

  const backgroundColor = isDarkMode ? "#121212" : "#F5F9FC";
  const textColor = isDarkMode ? "#ECF0F1" : "#2C3E50";
  const inputBackground = isDarkMode ? "#1E1E1E" : "#FFFFFF";
  const borderColor = isDarkMode ? "#444" : "#ccc";

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor, paddingBottom: 125 }]}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>Edit Profile</Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor={isDarkMode ? "#888" : "#999"}
        style={[styles.input, { backgroundColor: inputBackground, borderColor, color: textColor }]}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Address"
        placeholderTextColor={isDarkMode ? "#888" : "#999"}
        style={[styles.input, { backgroundColor: inputBackground, borderColor, color: textColor }]}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Contact"
        placeholderTextColor={isDarkMode ? "#888" : "#999"}
        style={[styles.input, { backgroundColor: inputBackground, borderColor, color: textColor }]}
        value={contact}
        onChangeText={setContact}
      />

      <Text style={[styles.sectionTitle, { color: textColor }]}>Theme</Text>
      <View style={styles.switchRow}>
        <Text style={{ color: textColor }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      <Text style={[styles.sectionTitle, { color: textColor }]}>Change Password</Text>
      {showPasswordChange ? (
        <View>
          <TextInput
            placeholder="Old Password"
            placeholderTextColor={isDarkMode ? "#888" : "#999"}
            secureTextEntry
            style={[styles.input, { backgroundColor: inputBackground, borderColor, color: textColor }]}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            placeholder="New Password"
            placeholderTextColor={isDarkMode ? "#888" : "#999"}
            secureTextEntry
            style={[styles.input, { backgroundColor: inputBackground, borderColor, color: textColor }]}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={isDarkMode ? "#888" : "#999"}
            secureTextEntry
            style={[styles.input, { backgroundColor: inputBackground, borderColor, color: textColor }]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
            <Text style={styles.buttonText}>Save Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPasswordChange(false)}>
            <Text style={{ color: "#e74c3c", marginTop: 10, textAlign: "center" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setShowPasswordChange(true)}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.sectionTitle, { color: textColor }]}>Linked Accounts</Text>
      {Object.keys(linkedAccounts).map((provider) => (
        <View style={styles.switchRow} key={provider}>
          <Text style={{ color: textColor }}>
            {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </Text>
          <Switch
            value={linkedAccounts[provider as keyof typeof linkedAccounts]}
            onValueChange={() => toggleLinked(provider as keyof typeof linkedAccounts)}
          />
        </View>
      ))}

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.buttonText}>Delete My Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
