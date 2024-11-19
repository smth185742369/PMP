import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

function Registration({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const db = useSQLiteContext();  // Initialize SQLite context

  const handleToggle = () => setIsLogin(!isLogin);

  const handleSubmit = async () => {
    if (email.length === 0 || password.length === 0 || (!isLogin && username.length === 0)) {
      Alert.alert('Attention!', 'Please fill in all fields!');
      return;
    }

    try {
      if (isLogin) {
        // Handle Login
        const user = await db.getFirstAsync('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (user) {
          Alert.alert('Success', 'Login successful!');
          navigation.navigate('ProfilePage', { user: email });
        } else {
          Alert.alert('Error', 'Invalid email or password.');
        }
      } else {
        // Handle Registration
        const existingUser = await db.getFirstAsync('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) {
          Alert.alert('Error', 'User already exists.');
        } else {
          await db.runAsync('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, password, username]);
          Alert.alert('Success', 'Registration successful!');
          navigation.navigate('ProfilePage', { user: email });
        }
      }
    } catch (error) {
      console.log('Error during submit:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}

      <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleSubmit} />

      <TouchableOpacity onPress={handleToggle} style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Log In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  toggleContainer: { marginTop: 15 },
  toggleText: { color: '#007BFF', fontSize: 16 },
});

export default Registration;
