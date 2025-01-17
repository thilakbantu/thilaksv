import React, { useContext, useState, useLayoutEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProfileContext } from "./ProfileContext";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const ProfileEditScreen = () => {
  const { profileImage, setProfileImage, email, setEmail, phone, setPhone,setFirstName,setLastName,firstName,lastName, username, setUsername, instituteName, setInstituteName } =
    useContext(ProfileContext);

  const [phoneError, setPhoneError] = useState("");
  const [warning, setWarning] = useState("");

  const navigation = useNavigation();

  // Set header background color when the screen is loaded
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: '#90caf9', // Fallback color for the header
        },
        headerBackground: () => (
          <LinearGradient
            colors={['#e3f2fd', '#90caf9']} // Header gradient colors
            style={{ flex: 1 }}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
          />
        ),
        headerTintColor: '#fff', // Optional: Adjust header text and icon color for better visibility
      });
    }, [navigation]);

  // Function to pick an image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "You need to grant permission to upload an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Function to handle phone number validation
  const handlePhoneChange = (text) => {
    if (!/^\d*$/.test(text)) {
      setPhoneError("Phone number must contain digits only.");
    } else if (text.length > 10) {
      setPhoneError("Phone number cannot exceed 10 digits.");
    } else if (text.length < 10) {
      setPhoneError("Enter valid Phone Number.");
    } else {
      setPhoneError(""); // Clear error if valid
    }
    setPhone(text);
  };

  // Function to handle input changes for institute name
  const handleInstituteNameChange = (text) => {
    setInstituteName(text);
    if (text !== text.toUpperCase()) {
      setWarning("Use capital letters only.");
    } else {
      setWarning(""); // Clear warning when text is uppercase
    }
  };

  const handleUpdate = () => {
    if (phoneError || warning || !email || !phone || !username || !instituteName) {
      Alert.alert("Error", "Please fix the errors and fill out all fields before updating.");
    } else {
      Alert.alert("Success", "Profile Updated!");
    }
  };

  return (
    <LinearGradient colors={["#e3f2fd", "#90caf9"]} style={styles.linearBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <Text style={styles.changePictureText}>Change Picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            editable={false} // Disable editing
          /> */}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={email}
            editable={false} // Disable editing
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={[styles.input, phoneError ? styles.errorInput : null]}
            keyboardType="phone-pad"
            maxLength={10} // Limit input length to 10 digits
            editable={false}
            value={phone}
            onChangeText={handlePhoneChange}
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            editable={false}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            editable={false}
            onChangeText={setLastName}
            />


          <Text style={styles.label}>Institute Name</Text>
          <TextInput style={styles.input} value={instituteName} onChangeText={handleInstituteNameChange}
          editable={false} />
          {warning ? <Text style={styles.warningText}>{warning}</Text> : null}
          
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearBackground: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePictureText: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  updateButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
  },
  warningText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default ProfileEditScreen;