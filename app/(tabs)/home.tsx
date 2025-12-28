import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Platform,
} from 'react-native';
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [location, setLocation] = useState<any>(null);
  const [search, setSearch] = useState('');

  // 🏁 Main Gate (Default Destination)
  const mainGate = {
    name: 'Pillai College Main Gate',
    latitude: 18.9908,
    longitude: 73.1275,
    steps: [
      'Exit your current location',
      'Follow the main campus road',
      'You have reached the Main Gate',
    ],
    time: '—',
  };

  // 🏢 Campus Buildings
  const buildings = [
    {
      name: 'Library',
      latitude: 18.9911,
      longitude: 73.1279,
      steps: [
        'Walk straight for 20 meters',
        'Take stairs to Floor 2',
        'Library is on the left',
      ],
      time: '3 mins',
    },
    {
      name: 'Admin Block',
      latitude: 18.9905,
      longitude: 73.1269,
      steps: [
        'Walk straight from Main Gate',
        'Turn right near garden',
        'Admin Block is ahead',
      ],
      time: '4 mins',
    },
    {
      name: 'Canteen',
      latitude: 18.9909,
      longitude: 73.1282,
      steps: [
        'Walk straight',
        'Turn left near parking',
        'Canteen is behind ground',
      ],
      time: '5 mins',
    },
  ];

  // 📍 Get Current Location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  // 🔍 Destination Logic
  const searchedBuilding =
    search.length > 0
      ? buildings.find(b =>
          b.name.toLowerCase().includes(search.toLowerCase())
        )
      : mainGate;

  return (
    <View style={styles.container}>
      {/* 🗺️ GOOGLE MAP */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: 18.9908,
          longitude: 73.1275,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
      >
        {/* 🏁 Main Gate Marker */}
        <Marker
          coordinate={{
            latitude: mainGate.latitude,
            longitude: mainGate.longitude,
          }}
          title={mainGate.name}
          pinColor="green"
        />

        {/* 🏢 Building Markers */}
        {buildings.map((b, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: b.latitude, longitude: b.longitude }}
            title={b.name}
          />
        ))}

        {/* 🧭 Route Line */}
        {location && searchedBuilding && (
          <Polyline
            coordinates={[
              {
                latitude: location.latitude,
                longitude: location.longitude,
              },
              {
                latitude: searchedBuilding.latitude,
                longitude: searchedBuilding.longitude,
              },
            ]}
            strokeWidth={5}
            strokeColor="#2563eb"
          />
        )}
      </MapView>

      {/* 🔍 Search Box */}
      <TextInput
        placeholder="Search building..."
        placeholderTextColor="#64748b"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* 📍 Navigation Panel */}
      {searchedBuilding && (
        <View style={styles.navigationBox}>
          <Text style={styles.navTitle}>{searchedBuilding.name}</Text>

          {searchedBuilding.steps.map((step, index) => (
            <Text key={index} style={styles.stepText}>
              ➡️ {step}
            </Text>
          ))}

          <Text style={styles.time}>⏱️ {searchedBuilding.time}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },

  search: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 10,
    left: 10,
    right: 60,
    backgroundColor: '#c4c5ceff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    elevation: 16,
  },

  navigationBox: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: '#1e3a8a',
    padding: 18,
    borderRadius: 18,
  },
  navTitle: {
    color: '#e0e7ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 6,
  },
  time: {
    color: '#c7d2fe',
    marginTop: 8,
    fontSize: 14,
  },
});
