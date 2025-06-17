import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>HandyCart</Text>
      
      <View style={styles.footer}>
        <Link href={"/settings"} style={styles.button}>
          <Image
            source={require("../assets/images/Settings.png")}
            style={styles.icon}
          />
        </Link>

        <Link href={"/"} style={styles.button}>
          <Image
            source={require("../assets/images/Home.png")}
            style={styles.icon}
          />
        </Link>

        <Link href={"/profile"} style={styles.button}>
          <Image
            source={require("../assets/images/Profile.png")}
            style={styles.icon}
          />
        </Link>
        
      </View>

      <Link href={"/grocery"} style={styles.button}>Grocery</Link>

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
        backgroundColor: "beige",
  },

  text: {
    color: 'grey',
  },

  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "pink",
  },
  
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },

  footer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 80,
  backgroundColor: 'burlywood',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingBottom: 10,
},

});