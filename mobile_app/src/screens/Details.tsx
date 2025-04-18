import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ImageCard = ({ imageSource, description, index }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Analysis {index + 1}</Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Icon 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#39FF14" 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.imageContainer}>
        <Image 
          source={imageSource} 
          style={styles.image} 
          resizeMode="contain" 
        />
      </View>
      
      {expanded && (
        <Text style={styles.description}>{description}</Text>
      )}
      
      {!expanded && (
        <TouchableOpacity 
          style={styles.readMoreButton} 
          onPress={() => setExpanded(true)}
        >
          <Text style={styles.readMoreText}>Read Analysis</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { prediction } = route.params;
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Set result text based on prediction
    if (prediction === '2drone' || prediction === '3drone') {
      setResult('Drone Detected');
    } else if (prediction === '2bird' || prediction === '3bird') {
      setResult('Bird Detected');
    }
    
    // Set images based on prediction
    if (prediction === '2drone' || prediction === '2bird') {
      setImages([
        { 
          src: require('../../images2d/plot1.jpg'), 
          text: 'Time-frequency spectrograms provide a detailed view of how a signal\'s frequency components evolve over time by dividing the signal into short segments, applying a Fourier Transform to each, and plotting the results with time on the x-axis, frequency on the y-axis, and amplitude represented by color. This visualization helps in distinguishing between different targets, such as drones and birds, by revealing unique patterns in their frequency changes.' 
        },
        { 
          src: require('../../images2d/plot2.jpg'), 
          text: 'Cyclic patterns reveal recurring patterns or cycles within the data, highlighting repetitive behaviors or periodic trends.' 
        },
      ]);
    } else {
      setImages([
        { 
          src: require('../../images/plot1.jpg'), 
          text: 'Time-frequency spectrograms provide a detailed view of how a signal\'s frequency components evolve over time by dividing the signal into short segments, applying a Fourier Transform to each, and plotting the results with time on the x-axis, frequency on the y-axis, and amplitude represented by color. This visualization helps in distinguishing between different targets, such as drones and birds, by revealing unique patterns in their frequency changes.' 
        },
        { 
          src: require('../../images/plot2.jpg'), 
          text: 'Waveforms and phase information depict a signal\'s amplitude variations and phase changes over time, providing a detailed view of its temporal behavior.' 
        },
        { 
          src: require('../../images/plot3.jpg'), 
          text: 'Frequency shift data tracks how a signal\'s frequency varies over time, highlighting shifts and changes in its frequency characteristics.' 
        },
        { 
          src: require('../../images/plot4.jpg'), 
          text: 'Cyclic patterns reveal recurring patterns or cycles within the data, highlighting repetitive behaviors or periodic trends.' 
        },
      ]);
    }
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [prediction]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analysis Results</Text>
      </View>
      
      <View style={styles.resultBanner}>
        <Icon 
          name={result.includes('Drone') ? "quadcopter" : "bird"} 
          size={30} 
          color="#39FF14" 
        />
        <Text style={styles.resultText}>{result}</Text>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#39FF14" />
          <Text style={styles.loadingText}>Loading analysis...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {images.map((image, index) => (
            <ImageCard
              key={index}
              index={index}
              imageSource={image.src}
              description={image.text}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  resultBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
    paddingVertical: 15,
    marginBottom: 10,
  },
  resultText: {
    color: '#39FF14',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: width - 60,
    height: 200,
    borderRadius: 8,
  },
  description: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 22,
    padding: 15,
  },
  readMoreButton: {
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  readMoreText: {
    color: '#39FF14',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
  },
});

export default Details;