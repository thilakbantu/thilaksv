import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Linking } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function CertificateScreen({ route }) {
  const { candidateName, moduleName, overallScore, performance } = route.params;

  // Sanitize the module name to remove special characters and replace spaces with underscores
  const sanitizedModuleName = moduleName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ');

  const generateCertificate = async () => {
    try {
      // Require images for local path reference
      const logo1 = require('../assets/images/l2.png'); // C-kite Logo
      const logo2 = require('../assets/images/treeset.jpg'); // Treeset Logo

      // Convert required images to file URIs
      const logo1Uri = Image.resolveAssetSource(logo1).uri;
      const logo2Uri = Image.resolveAssetSource(logo2).uri;

      // Play Store link
      const playStoreLink = 'https://play.google.com/store/apps/details?id=com.example';

      // Create the HTML for the certificate with sanitized module name
      const certificateHtml = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                background-color: #f3f4f6;
              }
              .certificate-container {
                border: 5px solid #0d47a1;
                padding: 20px;
                border-radius: 15px;
                background-color: #fff;
                position: relative;
              }
              .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
              }
              .logo1 {
                width: 150px;
                height: auto;
              }
              .logo2 {
                width: 70px;
                height: auto;
              }
              h1 {
                font-size: 30px;
                color: #0d47a1;
                margin-bottom: 20px;
              }
              p {
                font-size: 18px;
                color: #333;
                margin: 10px 0;
              }
              .name {
                font-size: 24px;
                font-weight: bold;
                color: #0d47a1;
              }
              .highlight {
                font-weight: bold;
                color: #388e3c;
              }
              .playstore-link {
                font-size: 16px;
                color: #0d47a1;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="certificate-container">
              <div class="header">
                <img  src="${logo1Uri}" alt="C-kite Logo" class="logo1" />
                <img src="${logo2Uri}" alt="Treeset Logo" class="logo2" />
              </div>
              <h1>CERTIFICATE OF COMPETENCE</h1>
              <p>IN <span class="highlight">${sanitizedModuleName}</span></p>
              <p>IS HEREBY AWARDED TO</p>
              <p class="name">${candidateName}</p>
              <p>
                For the successful completion of all modules with an overall score of
                <span class="highlight">${overallScore}%</span> and the performance is 
                <span class="highlight">${performance}</span>.
              </p>
              <p class="playstore-link">
                Download C - kite from the Play Store: <a href="${playStoreLink}" target="_blank">${playStoreLink}</a>
              </p>
            </div>
          </body>
        </html>
      `;

      // Sanitize the module name to create a valid file name for saving the PDF
      const sanitizedFileName = moduleName.replace(/\s+/g, '_').replace(/[^\w\s-]/g, '');
      const fileName = `${sanitizedFileName}_Certificate.pdf`;

      // Generate the PDF
      const { uri } = await Print.printToFileAsync({
        html: certificateHtml,
        width: 612, // Width for a standard A4 PDF
        height: 792, // Height for a standard A4 PDF
      });

      // Define the new file path
      const newFilePath = `${FileSystem.documentDirectory}${fileName}`;

      // Move the PDF to the new path with the module name
      await FileSystem.moveAsync({
        from: uri,
        to: newFilePath,
      });

      // Share the certificate or show a success alert
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newFilePath);
      } else {
        Alert.alert('Certificate Generated', `Certificate saved at: ${newFilePath}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while generating the certificate.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.certificateWrapper}>
        <Text style={styles.description}>
          Generate your certificate for completing the course!
        </Text>

        <TouchableOpacity style={styles.downloadButton} onPress={generateCertificate}>
          <Text style={styles.downloadButtonText}>Download Certificate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  certificateWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  downloadButton: {
    backgroundColor: '#0d47a1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playStoreSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  playStoreText: {
    fontSize: 16,
    color: '#333',
  },
  playStoreLink: {
    fontSize: 16,
    color: '#0d47a1',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  qrCodeWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
});