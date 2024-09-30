import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ImageCard = ({ imageSource, description }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { prediction } = route.params; // Capture the prediction from the previous screen
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Set images based on prediction
    console.log(prediction);
    if (prediction === '2drone' || prediction === '2bird') {
      setImages([
        { src: require('../../images2d/plot1.jpg'), text: 'Time-frequency spectrograms provide a detailed view of how a signals frequency components evolve over time by dividing the signal into short segments, applying a Fourier Transform to each, and plotting the results with time on the x-axis, frequency on the y-axis, and amplitude represented by color. This visualization helps in distinguishing between different targets, such as drones and birds, by revealing unique patterns in their frequency changes.' },
        { src: require('../../images2d/plot2.jpg'), text: 'Cyclic patterns reveal recurring patterns or cycles within the data, highlighting repetitive behaviors or periodic trends.' },
      ]);
    } else {
      setImages([
        { src: require('../../images/plot1.jpg'), text: 'Time-frequency spectrograms provide a detailed view of how a signals frequency components evolve over time by dividing the signal into short segments, applying a Fourier Transform to each, and plotting the results with time on the x-axis, frequency on the y-axis, and amplitude represented by color. This visualization helps in distinguishing between different targets, such as drones and birds, by revealing unique patterns in their frequency changes.' },
        { src: require('../../images/plot2.jpg'), text: 'Waveforms and phase information depict a signals amplitude variations and phase changes over time, providing a detailed view of its temporal behavior.' },
        { src: require('../../images/plot3.jpg'), text: 'Frequency shift data tracks how a signals frequency varies over time, highlighting shifts and changes in its frequency characteristics.' },
        { src: require('../../images/plot4.jpg'), text: 'Cyclic patterns reveal recurring patterns or cycles within the data, highlighting repetitive behaviors or periodic trends.' },
      ]);
    }
  }, [prediction]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Go Back" onPress={() => navigation.goBack()} color="#39FF14" />
      {images.map((image, index) => (
        <ImageCard
          key={index}
          imageSource={image.src}
          description={image.text}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#212529',
  },
  card: {
    backgroundColor: '#2a2f36',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  description: {
    color: '#39FF14',
    fontSize: 16,
  },
});

export default Details;
