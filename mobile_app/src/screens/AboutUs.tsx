import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';

// Import images from the assets folder
const BishwaPhoto = require('../../assets/Bishwa.jpg');
const GreenPhoto = require('../../assets/Green.jpg');
const DakshPhoto = require('../../assets/Daksh.jpg');
const AdityaPhoto = require('../../assets/Aditya.jpg');
const GovindPhoto = require('../../assets/Govind.jpg');
const NancyPhoto = require('../../assets/Nancy.jpg');

const teamMembers = [
  { name: 'Bishwa Thakur', photo: BishwaPhoto },
  { name: 'Green Kedia', photo: GreenPhoto },
  { name: 'Daksh Mor', photo: DakshPhoto },
  { name: 'Aditya Aryan', photo: AdityaPhoto },
  { name: 'Govind', photo: GovindPhoto },
  { name: 'Nancy Srivastava', photo: NancyPhoto },
];

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {teamMembers.map((member, index) => (
        <View key={index} style={styles.card}>
          <Image source={member.photo} style={styles.photo} />
          <Text style={styles.name}>{member.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#212529',
  },
  card: {
    alignItems: 'center',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#39FF14',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: 200,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
});
