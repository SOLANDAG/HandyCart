import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ABOUT</Text>

      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.card}>
          
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4924/4924538.png' }}
            style={styles.image}
          />

          
          <Text style={styles.sectionTitle}>Mission</Text>
          <Text style={styles.paragraph}>
            At HandyCart, our mission is to create a more inclusive online shopping experience for people with disabilities. We aim to remove barriers and promote independence by combining technology with empathy-driven design.
          </Text>

          
          <Text style={styles.sectionTitle}>What We Offer</Text>  
          <Text style={styles.paragraph}>
            • A user-friendly shopping interface tailored for accessibility{"\n"}
            • Optional voice-based navigation (for future versions){"\n"}
            • Easy product discovery with simplified layouts{"\n"}
            • A platform that supports inclusivity for all
          </Text>

          
          <Text style={styles.sectionTitle}>History</Text>
          <Text style={styles.paragraph}>
            HandyCart was developed as a college project by a group of students from Mapúa University. The idea came from understanding how technology can empower people with different needs and challenges.
          </Text>

          
          <Text style={styles.sectionTitle}>Incorporating Value</Text>
          <Text style={styles.paragraph}>
            HandyCart integrates accessibility features to provide real value to users who are often overlooked in the tech space. This project carries the message that inclusivity matters.
          </Text>

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 40,
  },
  header: {
    color: '#333',
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
    color: '#2c3e50',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
