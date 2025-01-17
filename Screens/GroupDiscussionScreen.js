import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Dimensions, ImageBackground } from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const GroupDiscussionScreen = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://backend-ckite.onrender.com/api/v1/Group-Discussion"; // Replace with your actual API URL
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API"); 
        }
        return response.json();
      })
      .then((data) => {
        if (data.docs) {
          setDocuments(data.docs); // Now using 'docs' instead of 'documents'
        } else {
          throw new Error("Invalid data format: 'docs' key missing");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error("Failed to fetch API data:", error);
      });
  }, []);

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/mainbg.jpg')} // Replace with your image URL or local asset
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Group Discussion Videos</Text>
        <Text style={styles.title}>
          Explore the best resources to ace your group discussions!
        </Text>
        {error && <Text style={styles.error}>Error: {error}</Text>}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {documents.map((doc) => (
            <View key={doc._id} style={styles.card}>
              <Text style={styles.cardTitle}>{doc.title}</Text>
              <Text style={styles.description}>{doc.description}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePress(doc.videoUrl)}
              >
                <Text style={styles.buttonText}>Watch Video</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Optional overlay for better readability
    padding: 20,
  },
  header: {
    fontSize: width > 400 ? 20 : 18,
    fontWeight: "bold",
    color: "#7a44f5",
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: width > 400 ? 18 : 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "column",
    alignItems: "center",
    width: width - 40,
  },
  cardTitle: {
    fontSize: width > 400 ? 18 : 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    lineHeight: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#7a44f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GroupDiscussionScreen;
