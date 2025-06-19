import { Text, View, StyleSheet } from "react-native";

export default function Payment() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>PAYMENT</Text>

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