import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function NotFound() {
  return (
    
    <View
      style={styles.container}
    >
      
      <Link href={"/"} style={styles.button}>Return To Home Screen</Link>

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