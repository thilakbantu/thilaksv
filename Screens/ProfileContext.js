import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState("../assets/images/Profile.jpg");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Default email
  const [phone, setPhone] = useState(""); // Default phone number
  const [instituteName, setInstituteName] = useState("");
  const [stream, setStream] = useState(""); // Initialize stream
  const [degree, setDegree] = useState(""); // Initialize degree
  const [firstName, setFirstName] = useState(""); // Default first name
  const [lastName, setLastName] = useState(""); // Default last name

  const setProfileData = ({
    username, email, phone, profileImage, instituteName, stream, degree, firstName, lastName
  }) => {
    if (username) setUsername(username);
    if (firstName) setFirstName(firstName);
    if (lastName) setLastName(lastName);
    if (email) setEmail(email);
    if (phone) setPhone(phone);
    if (profileImage) setProfileImage(profileImage);
    if (instituteName) setInstituteName(instituteName);
    if (stream) setStream(stream);
    if (degree) setDegree(degree);
  };

  return (
    <ProfileContext.Provider value={{
      profileImage,
      username,
      email,
      phone,
      instituteName,
      stream,
      degree,
      firstName,
      lastName,
      setProfileData
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
