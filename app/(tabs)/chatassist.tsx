// 1️⃣ IMPORTS
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 2️⃣ CONSTANTS
const WEBHOOK_URL =
  "https://fe6d07f40a79.ngrok-free.app/webhook/bab881ea-e42d-4da6-a216-edfd21a0d08a";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

const CHAT_KEY_PREFIX = "chat_history_";

// 🔹 Typing dots component
const TypingDots = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.typingDots}>{dots}</Text>;
};

// 3️⃣ COMPONENT
export default function AssistantScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi 👋 Ask me where your class or lab is.",
      sender: "bot",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const [sessionId] = useState(() =>
    Math.random().toString(36).substring(2, 10)
  );

  // ✅ LOAD CHAT HISTORY (USER ONLY)
  useEffect(() => {
    const loadChatHistory = async () => {
      const userType = await AsyncStorage.getItem("userType");
      if (userType !== "user") return;

      const email = await AsyncStorage.getItem("userEmail");
      if (!email) return;

      const savedChat = await AsyncStorage.getItem(
        CHAT_KEY_PREFIX + email
      );

      if (savedChat) {
        setMessages(JSON.parse(savedChat));
      }
    };

    loadChatHistory();
  }, []);

  // ✅ SAVE CHAT HISTORY (USER ONLY)
  useEffect(() => {
    const saveChatHistory = async () => {
      const userType = await AsyncStorage.getItem("userType");
      if (userType !== "user") return;

      const email = await AsyncStorage.getItem("userEmail");
      if (!email) return;

      await AsyncStorage.setItem(
        CHAT_KEY_PREFIX + email,
        JSON.stringify(messages)
      );
    };

    saveChatHistory();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const url = `${WEBHOOK_URL}?query=${encodeURIComponent(
        userMessage.text
      )}&sessionId=${sessionId}`;

      const res = await fetch(url, { method: "GET" });
      const data = await res.json();

      let replyText = "I will guide you 📍";

      if (Array.isArray(data) && data[0]?.reply) replyText = data[0].reply;
      else if (data.reply) replyText = data.reply;
      else if (data.output) replyText = data.output;
      else if (typeof data === "string") replyText = data;

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + "_bot",
          text: replyText,
          sender: "bot",
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + "_err",
          text: "Unable to connect 😕",
          sender: "bot",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="school-outline" size={22} color="#1E5EFF" />
          <Text style={styles.headerText}>Smart Assistant</Text>
        </View>

        {/* Chat */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.sender === "user"
                  ? styles.userBubble
                  : styles.botBubble,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  item.sender === "user" && { color: "#fff" },
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={[styles.bubble, styles.botBubble]}>
            <Text style={styles.typingText}>Smart Assistant is typing</Text>
            <TypingDots />
          </View>
        )}

        {/* Input */}
        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Where is CSE Lab?"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// 4️⃣ STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 3,
  },

  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#1E5EFF",
  },

  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
  },

  userBubble: {
    backgroundColor: "#1E5EFF",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },

  botBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },

  text: {
    fontSize: 15,
    color: "#333",
  },

  typingText: {
    fontSize: 14,
    color: "#555",
  },

  typingDots: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E5EFF",
    marginTop: 4,
  },

  inputBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#F1F4FF",
    padding: 12,
    borderRadius: 12,
  },

  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#1E5EFF",
    padding: 12,
    borderRadius: 12,
  },
});
