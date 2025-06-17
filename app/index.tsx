import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>HandyCart</Text>
      
      <Link href={"/settings"} style={styles.button}>
        <Image
          source={require("../assets/images/Settings.png")}
          style={styles.icon}
        />
      </Link>

      <Link href={"/profile"} style={styles.button}>
        <Image
          source={require("../assets/images/Profile.png")}
          style={styles.icon}
        />
      </Link>

      <Link href={"/grocery"} style={styles.button}>
        <Image
          source={require("../assets/images/Cart.png")}
          style={styles.icon}
        />
      </Link>
      
      <Link href={"/transportation"} style={styles.button}>Transportation</Link>

      <Link href={"/about"} style={styles.button}>About</Link>
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
  },
  
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },

});