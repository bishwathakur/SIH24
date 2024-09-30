import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState('2d');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // State for loader
  const navigation = useNavigation();

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        presentationStyle: 'fullScreen',
      });
      setFile(result);
      setError(null);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setError('User cancelled the file picker');
      } else {
        setError('Unknown error: ' + err);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);  // Show loader
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode); // Add mode to form data

    try {
      const response = await axios.post('http://192.168.234.249:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      let rawPrediction = response.data.predictions;
      let finalPrediction = null;

      // Mapping the predictions to final output
      if (rawPrediction === '2drone' || rawPrediction === '3drone') {
        finalPrediction = 'Drone';
      } else if (rawPrediction === '2bird' || rawPrediction === '3bird') {
        finalPrediction = 'Bird';
      }
      setPrediction(finalPrediction)
      setError(null);

      // Navigate to Details screen with mode parameter
      setTimeout(() => {
        navigation.navigate('Details', {prediction}); // Pass mode as parameter
      }, 3000);
    } catch (err) {
      setError('Error uploading file');
      setPrediction(null);
    } finally {
      setLoading(false);  // Hide loader
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload a File for Prediction</Text>

      <TouchableOpacity style={styles.button} onPress={handleFilePicker}>
        <Text style={styles.buttonText}>Select File</Text>
      </TouchableOpacity>

      {file && <Text style={styles.fileName}>{file.name}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload and Predict</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#39FF14" />
          <Text style={styles.loaderText}>Generating Prediction...</Text>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
      {prediction && <Text style={styles.prediction}>Prediction: {prediction}</Text>}
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#39FF14',
    borderRadius: 4,
    color: '#fff',
    backgroundColor: '#212529',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#39FF14',
    borderRadius: 4,
    color: '#fff',
    backgroundColor: '#212529',
    marginBottom: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212529',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#39FF14',
  },
  button: {
    backgroundColor: '#39FF14',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fileName: {
    color: 'white',
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  prediction: {
    color: '#39FF14',
    marginTop: 20,
    fontSize: 16,
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loaderText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default MainScreen;
