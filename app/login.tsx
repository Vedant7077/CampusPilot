import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const adminEmails = ["ad@gmail.com", "pillaiadmin@gmail.com"];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("userType", "user");
      await AsyncStorage.setItem("userEmail", email);

      if (adminEmails.includes(email)) {
        router.replace("/dashboard");
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#2563eb", "#3b82f6", "#60a5fa"]}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.card}>
        {/* 🏫 LOGO */}
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>CampusPilot</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#64748b"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#64748b"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guestBtn}
          onPress={async () => {
            await AsyncStorage.setItem("userType", "guest");
            await AsyncStorage.removeItem("userEmail");
            router.replace("/(tabs)/home");
          }}
        >
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 25,
    elevation: 8,
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#1e40af",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#c7d2fe",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f8fafc",
  },
  loginBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  loginText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  guestBtn: {
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2563eb",
    width: "100%",
  },
  guestText: {
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "600",
  },
});
