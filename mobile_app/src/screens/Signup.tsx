import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#A5A5A1" style={styles.icon} />
        <TextInput 
          placeholder="Username" 
          placeholderTextColor="#A5A5A1" 
          style={styles.input} 
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="#A5A5A1" style={styles.icon} />
        <TextInput 
          placeholder="Email" 
          placeholderTextColor="#A5A5A1" 
          style={styles.input} 
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="key" size={20} color="#A5A5A1" style={styles.icon} />
        <TextInput 
          placeholder="Password" 
          placeholderTextColor="#A5A5A1" 
          secureTextEntry={true} 
          style={styles.input} 
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already a user? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212529',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#39FF14',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 10,
    color:'white'
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: 'white',
  },
  button: {
    backgroundColor: '#39FF14',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#39FF14',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default Signup;
