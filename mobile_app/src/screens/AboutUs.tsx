import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Linking 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Team member data
const teamMembers = [
  { 
    name: 'Bishwa Thakur', 
    photo: require('../assets/Bishwa.jpg'),
    role: 'Full Stack Mobile App Developer',
    linkedin: 'https://linkedin.com/in/bishwa-thakur'
  },
  { 
    name: 'Daksh Mor', 
    photo: require('../assets/Daksh.jpg'),
    role: 'ML Engineer',
    linkedin: 'https://www.linkedin.com/in/daksh-mor/'
  },
  { 
    name: 'Aditya Aryan', 
    photo: require('../assets/Aditya.jpg'),
    role: 'Full Stack Web Developer',
    linkedin: 'https://www.linkedin.com/in/aditya-aryan-63b621288/'
  },
  { 
    name: 'Govind', 
    photo: require('../assets/Govind.jpg'),
    role: 'Frontend Developer',
    linkedin: 'https://www.linkedin.com/in/govind-gangele-5537b7287/'
  },
  { 
    name: 'Nancy Srivastava', 
    photo: require('../assets/Nancy.jpg'),
    role: 'ML Engineer',
    linkedin: 'https://www.linkedin.com/in/nancy-srivastava-2k05/'
  },
  {
    name:'Green Kedia',
    photo:require('../assets/Green.jpg'),
    role:'ML Engineer',
    linkedin: 'https://www.linkedin.com/in/green-kedia/'
  }
];

const AboutUs = () => {
  const openLinkedIn = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening LinkedIn:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Team</Text>
        <Text style={styles.headerSubtitle}>
          Meet the talented individuals behind Invisible Eye
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card}
            onPress={() => openLinkedIn(member.linkedin)}
            activeOpacity={0.9}
          >
            <View style={styles.photoContainer}>
              <Image source={member.photo} style={styles.photo} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.role}>{member.role}</Text>
              <View style={styles.linkedinButton}>
                <Icon name="linkedin" size={16} color="#FFFFFF" />
                <Text style={styles.linkedinText}>View Profile</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 Invisible Eye. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF14',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  teamContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  photoContainer: {
    padding: 15,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#39FF14',
  },
  infoContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 10,
  },
  linkedinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 20, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  linkedinText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 5,
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    alignItems: 'center',
  },
  footerText: {
    color: '#999999',
    fontSize: 12,
  },
});

export default AboutUs;
