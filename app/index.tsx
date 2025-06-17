import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Hello everyone.</Text>
      
      <Link href={"/about"} style={styles.button}>About</Link>

      <Link href={"/profile"} style={styles.button}>Profile</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
    backgroundColor: "brown",
  },

  text: {
    color: 'white',
  },

  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  }
});