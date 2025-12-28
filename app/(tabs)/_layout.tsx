import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, false),
      }}>
      
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="indoor"
        options={{
          title: 'Indoor',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />

      
      <Tabs.Screen
        name="chatassist"
        options={{
          title: 'AI-help',
          tabBarIcon: ({ color }) => <TabBarIcon name="commenting" color={color} />,
        }}
      />
      <Tabs.Screen
  name="scan"
  options={{
    title: 'Logout',
    tabBarIcon: ({ color }) => (
      <TabBarIcon name="sign-out" color={color} />
    ),
  }}
  listeners={{
    tabPress: (e) => {
      e.preventDefault(); // ⛔ stop normal navigation

      // 🔐 clear login data
      AsyncStorage.removeItem('token'); // or user / auth key

      // 🔁 redirect to login
      router.replace('/login');
    },
  }}
/>

    </Tabs>
  );
}
