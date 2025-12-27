import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Stack, router } from 'expo-router';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 👨‍🎓 Admin emails (hardcoded)
  const adminEmails = ['ad@gmail.com', 'pillaiadmin@gmail.com'];

  // 🔐 Firebase Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Role check
      if (adminEmails.includes(email)) {
        Alert.alert('Login Successful', 'Welcome Admin', [
          {
            text: 'OK',
            onPress: () => router.replace('/admin/dashboard'),
          },
        ]);
      } else {
        Alert.alert('Login Successful', 'Welcome User', [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/home'),
          },
        ]);
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  // 👤 Guest Mode
  const guestLogin = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />

      <Text style={styles.title}>Smart Campus Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
      <View style={{ marginTop: 10 }} />
      <Button title="Continue as Guest" onPress={guestLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
});
