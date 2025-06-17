import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Hello everyone.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
    backgroundColor: "beige",
  },
  text: {
    color: 'white',
  },
});