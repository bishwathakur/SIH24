import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// Define loading steps
const STEPS = {
  PREPARING: 'Preparing file for upload...',
  UPLOADING: 'Uploading file to server...',
  PROCESSING: 'Processing audio data...',
  ANALYZING: 'Analyzing for bird/drone patterns...',
  FINALIZING: 'Finalizing prediction results...'
};

const MainScreen = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);
  const navigation = useNavigation();

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        presentationStyle: 'fullScreen',
      });
      setFile(result);
      setError(null);
      // Reset steps when selecting a new file
      setCompletedSteps([]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setError('File selection cancelled');
      } else {
        setError('Error selecting file: ' + err.message);
      }
    }
  };

  // Function to update loading step
  const updateStep = (step) => {
    setCurrentStep(step);
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    // Start loading immediately
    setLoading(true);
    setCompletedSteps([]);
    updateStep(STEPS.PREPARING);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulate preparing step (this happens immediately)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update to uploading step
      updateStep(STEPS.UPLOADING);
      
      // Start the actual upload
      const response = await axios.post('https://sih24-8j8v.onrender.com/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          // If upload is taking time, we can show progress here
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      });
      
      // Update to processing step after upload completes
      updateStep(STEPS.PROCESSING);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Update to analyzing step
      updateStep(STEPS.ANALYZING);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Final step
      updateStep(STEPS.FINALIZING);
      
      let rawPrediction = response.data.predictions;
      let finalPrediction = null;

      if (rawPrediction === '2drone' || rawPrediction === '3drone') {
        finalPrediction = 'Drone';
      } else if (rawPrediction === '2bird' || rawPrediction === '3bird') {
        finalPrediction = 'Bird';
      }
      
      setPrediction(finalPrediction);
      setError(null);

      // Navigate to Details screen with prediction parameter
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Details', { prediction: rawPrediction });
      }, 1000);
    } catch (err) {
      setError('Error uploading file: ' + (err.response?.data?.message || err.message));
      setPrediction(null);
      setLoading(false);
    }
  };

  // Render a single step in the loading process
  const renderStep = (step, index) => {
    const isCompleted = completedSteps.includes(step);
    const isActive = currentStep === step;
    
    return (
      <View key={index} style={styles.stepContainer}>
        <View style={[
          styles.stepIcon, 
          isCompleted ? styles.stepCompleted : (isActive ? styles.stepActive : styles.stepPending)
        ]}>
          {isCompleted ? (
            <Icon name="check" size={16} color="#000000" />
          ) : (
            isActive ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <Text style={styles.stepNumber}>{index + 1}</Text>
            )
          )}
        </View>
        <Text style={[
          styles.stepText,
          isActive ? styles.stepTextActive : (isCompleted ? styles.stepTextCompleted : styles.stepTextPending)
        ]}>
          {step}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload a File for Prediction</Text>
        <Text style={styles.subtitle}>
          Upload audio files to detect birds or drones
        </Text>
      </View>

      <View style={styles.uploadSection}>
        <TouchableOpacity 
          style={styles.uploadArea} 
          onPress={handleFilePicker}
          activeOpacity={0.7}
          disabled={loading}
        >
          <Icon name="file-upload-outline" size={50} color="#39FF14" />
          <Text style={styles.uploadText}>
            {file ? 'Change File' : 'Select File'}
          </Text>
        </TouchableOpacity>

        {file && (
          <View style={styles.fileInfo}>
            <Icon name="file-check-outline" size={24} color="#39FF14" />
            <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
              {file.name}
            </Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle-outline" size={20} color="#FF3B30" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity 
          style={[
            styles.predictButton, 
            (!file || loading) && styles.disabledButton
          ]} 
          onPress={handleUpload}
          disabled={!file || loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <View style={styles.buttonLoading}>
              <ActivityIndicator size="small" color="#000000" />
              <Text style={styles.buttonLoadingText}>Processing...</Text>
            </View>
          ) : (
            <>
              <Icon name="radar" size={20} color="#000000" />
              <Text style={styles.predictButtonText}>Upload and Predict</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.stepsContainer}>
          {Object.values(STEPS).map((step, index) => renderStep(step, index))}
        </View>
      )}

      {prediction && !loading && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Prediction Result:</Text>
          <Text style={styles.resultText}>{prediction}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF14',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadSection: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#39FF14',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  fileName: {
    color: '#FFFFFF',
    marginLeft: 10,
    flex: 1,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#FF3B30',
    marginLeft: 10,
  },
  predictButton: {
    backgroundColor: '#39FF14',
    borderRadius: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#39FF14',
  },
  predictButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLoadingText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  stepsContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepPending: {
    backgroundColor: '#333333',
  },
  stepActive: {
    backgroundColor: '#39FF14',
  },
  stepCompleted: {
    backgroundColor: '#39FF14',
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 14,
  },
  stepTextPending: {
    color: '#999999',
  },
  stepTextActive: {
    color: '#39FF14',
    fontWeight: 'bold',
  },
  stepTextCompleted: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF14',
  },
});

export default MainScreen;