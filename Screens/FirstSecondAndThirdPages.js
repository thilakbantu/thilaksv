import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const FirstSecondAndThirdPages = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();

  const goToNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToHome = () => {
    navigation.navigate("Home");
  };

  const handleSwipe = (event) => {
    if (event.nativeEvent.translationX > 50) {
      goToPreviousPage(); // Swipe left (go to previous page)
    } else if (event.nativeEvent.translationX < -50) {
      goToNextPage(); // Swipe right (go to next page)
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Skip Button at Top Right */}
        

        <PanGestureHandler onHandlerStateChange={handleSwipe}>
          <View style={styles.pageContainer}>
            {/* Page Content */}
            {currentPage === 1 && (
              <View style={styles.textContainer}>
                <Image
                  source={require("../assets/images/mainpage1.png")}
                  style={styles.image}
                />
                <Text style={styles.title}>
                  Learning never exhausts the mind—it fuels it for greater challenges ahead.
                </Text>
                <Text style={styles.description}>
                Examination is more than just questions; they are opportunities to grow and test the knowledge.
                Every attempt of learning brings confidence and success to career
                </Text>
              </View>
            )}
            <View style={styles.skipButtonContainer}>
              <TouchableOpacity style={styles.skipButton} onPress={goToHome}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            </View>
            
            {currentPage === 2 && (
              <View style={styles.textContainer}>
                <Image
                  source={require("../assets/images/mainpage2.png")}
                  style={styles.image}
                />
                <Text style={styles.title}>
                  The future belongs to those who prepare for it today.
                </Text>
                <Text style={styles.description}>
                Embrace the challenge and unlock your potential by experiencing the journey of modules
                </Text>
              </View>
            )}

            {currentPage === 3 && (
              <View style={styles.textContainer}>
                <Image
                  source={require("../assets/images/mainpage3.png")}
                  style={styles.image}
                />
                <Text style={styles.title}>
                  Success is the sum of small efforts, repeated day in and day out.
                </Text>
                <Text style={styles.description}>
                  Stay consistent, stay determined, and watch as your dedication paves the way to achieving your dreams.
                </Text>
              </View>
            )}

            {/* Pagination */}
            <View style={styles.pagination}>
              <View style={[styles.dot, currentPage === 1 ? styles.activeDot : null]} />
              <View style={[styles.dot, currentPage === 2 ? styles.activeDot : null]} />
              <View style={[styles.dot, currentPage === 3 ? styles.activeDot : null]} />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              {currentPage > 1 && (
                <TouchableOpacity style={styles.previousButton} onPress={goToPreviousPage}>
                  <Text style={styles.nextPreviousText}>Previous</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.nextButton, currentPage === 1 ? styles.nextButtonFirstPage : null]}
                onPress={currentPage === 3 ? goToHome : goToNextPage} // Navigate to Home on Finish
              >
                <Text style={styles.nextPreviousText}>
                  {currentPage === 3 ? "Finish" : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF3D5",
  },
  skipButtonContainer: {
    position: "absolute",
    top: height * 0.05,
    right: width * 0.05,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: width * 0.05,
    color: "#555555",
    textDecorationLine: "underline",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: width * 0.05,
  },
  textContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: "contain",
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.04,
    color: "#555555",
    textAlign: "center",
    lineHeight: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  dot: {
    width: width * 0.025,
    height: width * 0.025,
    borderRadius: width * 0.0125,
    backgroundColor: "#E0E0E0",
    marginHorizontal: width * 0.01,
  },
  activeDot: {
    backgroundColor: "#3B82F6",
  },
  buttonContainer: {
    position: "absolute",
    bottom: height * 0.05,
    width: "100%",
    alignItems: "center",
  },
  nextButton: {
    position: "absolute",
    bottom: -8,
    right: 0,
  },
  nextButtonFirstPage: {
    alignSelf: "flex-end",
  },
  previousButton: {
    position: "absolute",
    left: 25,
    bottom: -8,
  },
  nextPreviousText: {
    fontSize: 20,
    color: "#3B82F6",
  },
});

export default FirstSecondAndThirdPages;
