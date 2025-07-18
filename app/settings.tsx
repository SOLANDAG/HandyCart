import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { themes, useTheme } from "../components/context/ThemeContext";

export default function Settings() {
  const { theme, setTheme } = useTheme();
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

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Password changed from "${oldPassword}" to "${newPassword}"`);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordChange(false);
  };

  const handleDeleteAccount = () => {
    alert("Account deleted");
  };

  const themeOptions = [
    { label: "Original Colors", key: "original" },
    { label: "Dark Mode", key: "dark" },
    { label: "Green-Red Colorblind", key: "colorblindGreenRed" },
    { label: "Blue-Yellow Colorblind", key: "colorblindBlueYellow" },
    { label: "Monochrome", key: "monochrome" },
    { label: "Lemon Summer", key: "lemonSummer" },
    { label: "Pastel Morning", key: "pastelMorning" },
    { label: "Forever Fields", key: "foreverFields" },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Theme</Text>

      {themeOptions.map((option) => (
        <View key={option.key} style={styles.switchRow}>
          <Text style={{ color: theme.text }}>{option.label}</Text>
          <Switch
            value={theme.name === option.key}
            onValueChange={() => setTheme(option.key as keyof typeof themes)}
          />
        </View>
      ))}

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Change Password</Text>
      {showPasswordChange ? (
        <View>
          <TextInput
            placeholder="Old Password"
            placeholderTextColor={theme.border}
            secureTextEntry
            style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            placeholder="New Password"
            placeholderTextColor={theme.border}
            secureTextEntry
            style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={theme.border}
            secureTextEntry
            style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={handlePasswordChange}>
            <Text style={styles.buttonText}>Save Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPasswordChange(false)}>
            <Text style={{ color: "crimson", marginTop: 10, textAlign: "center" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={() => setShowPasswordChange(true)}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Linked Accounts</Text>
      {Object.keys(linkedAccounts).map((provider) => (
        <View style={styles.switchRow} key={provider}>
          <Text style={{ color: theme.text }}>
            {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </Text>
          <Switch
            value={linkedAccounts[provider as keyof typeof linkedAccounts]}
            onValueChange={() => toggleLinked(provider as keyof typeof linkedAccounts)}
          />
        </View>
      ))}

      <TouchableOpacity style={[styles.button, { backgroundColor: "crimson" }]} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete My Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 125 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 10 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 },
  button: { padding: 15, borderRadius: 8, marginTop: 10, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});
