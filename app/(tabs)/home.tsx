import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [location, setLocation] = useState<any>(null);
  const [search, setSearch] = useState('');

  // 📍 Campus buildings (STATIC DATA)
  const buildings = [
    {
      name: 'Library',
      latitude: 18.9911,
      longitude: 73.1279,
    },
    {
      name: 'Admin Block',
      latitude: 18.9905,
      longitude: 73.1269,
    },
    {
      name: 'Canteen',
      latitude: 18.9909,
      longitude: 73.1282,
    },
  ];

  // 📍 Get user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  // 🔍 Search building
  const searchedBuilding = buildings.find(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Search building..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: 18.9908,
          longitude: 73.1275,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        region={
          searchedBuilding
            ? {
                latitude: searchedBuilding.latitude,
                longitude: searchedBuilding.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }
            : undefined
        }
      >
        {/* 🏫 Building Markers */}
        {buildings.map((b, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: b.latitude, longitude: b.longitude }}
            title={b.name}
          />
        ))}

        {/* ➡️ Route (Outdoor navigation simulation) */}
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
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  search: {
    position: 'absolute',
    top: 40,
    left: 15,
    right: 15,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
});
