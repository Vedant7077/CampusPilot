import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

// Replace image URLs with your own images or local assets
const buildingsData = [
  {
    name: 'Arts, Science & Commerce',
    floors: [
      {
        name: 'Ground Floor',
        rooms: [
          {
            name: 'Classroom 001',
            image: 'https://i.imgur.com/yourImage3.jpg',  // Example of local asset
            steps: ['Enter Main Gate', 'Walk straight 50m', 'Room is on left'],
          },
          {
            name: 'Classroom 002',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Enter Main Gate', 'Walk straight 50m', 'Room is on right'],
          },
          {
            name: 'Classroom 003',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Enter Main Gate', 'Walk straight 50m', 'Room is on right'],
          },
          {
            name: 'Science Lab',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Enter Main Gate', 'Walk straight 50m', 'Room is on right'],
          },
          {
            name: 'Ladies Washroom',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Enter Main Gate', 'Walk straight 50m', 'Room is on right'],
          },
          {
            name: 'Gents Washroom',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Enter Main Gate', 'Walk straight 50m', 'Room is on right'],
          },
          
        ],
      },
      {
        name: 'First Floor',
        rooms: [
          {
            name: 'Lab 101',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Take stairs to 1st floor', 'Turn right', 'Lab is ahead'],
          },
          {
            name: 'Lab 102',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Take stairs to 1st floor', 'Turn right', 'Lab is ahead'],
          },
          {
            name: 'Classroom 104',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Take stairs to 1st floor', 'Turn right', 'Lab is ahead'],
          },
          {
            name: 'Classroom 105',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Take stairs to 1st floor', 'Turn right', 'Lab is ahead'],
          },
          {
            name: 'Classroom 106',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Take stairs to 1st floor', 'Turn right', 'Lab is ahead'],
          },
          {
            name: 'Staffroom',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Take stairs to 1st floor', 'Turn right', 'Lab is ahead'],
          },
          {
            name: 'HOD cabin',
            image: 'https://i.imgur.com/yourImage3.jpg',
            steps: ['Take stairs to 1st floor', 'Turn right', 'Lab is ahead'],
          },
        ],
      },
    ],
  },
  {
    name: 'Engineering',
    floors: [
      {
        name: 'Ground Floor',
        rooms: [
          {
            name: 'Mechanical Workshop',
            image: 'https://i.imgur.com/yourImage4.jpg',
            steps: ['Enter Main Gate', 'Walk straight to central ground', 'Workshop on left'],
          },
          {
            name: 'Electrical Workshop',
            image: 'https://i.imgur.com/yourImage4.jpg',
            steps: ['Enter Main Gate', 'Walk straight to central ground', 'Workshop on left'],
          },
          {
            name: 'Extc Lab 001',
            image: 'https://i.imgur.com/yourImage4.jpg',
            steps: ['Enter Main Gate', 'Walk straight to central ground', 'Workshop on left'],
          },
          {
            name: 'MECH Lab 002',
            image: 'https://i.imgur.com/yourImage4.jpg',
            steps: ['Enter Main Gate', 'Walk straight to central ground', 'Workshop on left'],
          },
          {
            name: 'Extc CR-1',
            image: 'https://i.imgur.com/yourImage4.jpg',
            steps: ['Enter Main Gate', 'Walk straight to central ground', 'Workshop on left'],
          },
          {
            name: 'Extc CR-2',
            image: 'https://i.imgur.com/yourImage4.jpg',
            steps: ['Enter Main Gate', 'Walk straight to central ground', 'Workshop on left'],
          },
          {
            name: 'Mech Cr-1',
            image: 'https://i.imgur.com/yourImage4.jpg',
            steps: ['Enter Main Gate', 'Walk straight to central ground', 'Workshop on left'],
          },

        ],
      },
      {
        name: 'First Floor',
        rooms: [
          {
            name: 'Comp Lab-1',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 1st floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'Comp Lab-2',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 1st floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'Comp Lab-3',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 1st floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'Comp Lab-4',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 1st floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'Comp Lab-5',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 1st floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'Comp Cr-1',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 1st floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'Comp Cr-2',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 1st floor', 'Turn left', 'Lab is on right'],
          },
        ],
      },
      {
        name: 'Second Floor',
        rooms: [
          {
            name: 'Mech Lab-02',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 2nd floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'ITI Cr-1',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 2nd floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'ITI Lab-01',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 2nd floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'Girls Common Room',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 2nd floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'Boys Common Room',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 2nd floor', 'Turn left', 'Lab is on right'],
          },
          {
            name: 'IT Staffroom',
            image: 'https://i.imgur.com/yourImage5.jpg',
            steps: ['Take stairs to 2nd floor', 'Turn left', 'Lab is on right'],
          },
          
          
        ],
      },
    ],
  },
  {
    name: 'Library',
    floors: [
      {
        name: 'Ground Floor',
        rooms: [
          {
            name: 'Reading Hall',
            image: 'https://i.imgur.com/yourImage6.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reading Hall is on left'],
          },
          {
            name: 'Reference Section',
            image: 'https://i.imgur.com/yourImage7.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reference Section is on right'],
          },
        ],
      },
    ],
  },
  {
    name: 'ITI Building',
    floors: [
      {
        name: 'Ground Floor',
        rooms: [
          {
            name: 'Reading Hall',
            image: 'https://i.imgur.com/yourImage6.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reading Hall is on left'],
          },
          {
            name: 'Reference Section',
            image: 'https://i.imgur.com/yourImage7.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reference Section is on right'],
          },
        ],
      },
    ],
  },
  {
    name: 'Canteen',
    floors: [
      {
        name: 'Ground Floor',
        rooms: [
          {
            name: 'Reading Hall',
            image: 'https://i.imgur.com/yourImage6.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reading Hall is on left'],
          },
          {
            name: 'Reference Section',
            image: 'https://i.imgur.com/yourImage7.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reference Section is on right'],
          },
        ],
      },
    ],
  },
  {
    name: 'Palm Wing',
    floors: [
      {
        name: 'Pal',
        rooms: [
          {
            name: 'Reading Hall',
            image: 'https://i.imgur.com/yourImage6.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reading Hall is on left'],
          },
          {
            name: 'Reference Section',
            image: 'https://i.imgur.com/yourImage7.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reference Section is on right'],
          },
        ],
      },
    ],
  },
  {
    name: 'Rose Wing',
    floors: [
      {
        name: 'Ground Floor',
        rooms: [
          {
            name: 'Reading Hall',
            image: 'https://i.imgur.com/yourImage6.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reading Hall is on left'],
          },
          {
            name: 'Reference Section',
            image: 'https://i.imgur.com/yourImage7.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reference Section is on right'],
          },
        ],
      },
    ],
  },
  {
    name: 'Lotus Wing',
    floors: [
      {
        name: 'Ground Floor',
        rooms: [
          {
            name: 'Reading Hall',
            image: 'https://i.imgur.com/yourImage6.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reading Hall is on left'],
          },
          {
            name: 'Reference Section',
            image: 'https://i.imgur.com/yourImage7.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reference Section is on right'],
          },
        ],
      },
    ],
  },
  {
    name: 'Sunflower Wing',
    floors: [
      {
        name: 'Ground Floor',
        rooms: [
          {
            name: 'Reading Hall',
            image: 'https://i.imgur.com/yourImage6.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reading Hall is on left'],
          },
          {
            name: 'Reference Section',
            image: 'https://i.imgur.com/yourImage7.jpg',
            steps: ['Enter Main Gate', 'Walk straight 100m', 'Reference Section is on right'],
          },
        ],
      },
    ],
  },
];

export default function IndoorNavigation() {
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [selectedFloor, setSelectedFloor] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>🏫 Indoor Navigation</Text> */}
      <Text style={styles.subtitle}>Starting Point: Main Gate</Text>

      {/* Show Buildings */}
      {!selectedBuilding &&
        buildingsData.map((b, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() => setSelectedBuilding(b)}
            activeOpacity={0.8}
          >
            <Text style={styles.place}>🎓 {b.name}</Text>
          </TouchableOpacity>
        ))}

      {/* Show Floors */}
      {selectedBuilding && !selectedFloor &&
        selectedBuilding.floors.map((f, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() => setSelectedFloor(f)}
            activeOpacity={0.8}
          >
            <Text style={styles.place}>🏢 {f.name}</Text>
          </TouchableOpacity>
        ))}

      {/* Show Rooms */}
      {selectedFloor && !selectedRoom &&
        selectedFloor.rooms.map((r, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() => setSelectedRoom(r)}
            activeOpacity={0.8}
          >
            <Text style={styles.place}>📖 {r.name}</Text>
          </TouchableOpacity>
        ))}

      {/* Show Steps + Image */}
      {selectedRoom && (
        <View style={[styles.card, styles.stepsCard]}>
          {selectedRoom.image && (
            <Image
              source={selectedRoom.image.startsWith('http') ? { uri: selectedRoom.image } : selectedRoom.image}
              style={styles.roomImage}
              resizeMode="cover"
            />
          )}
          <Text style={styles.place}>📖 {selectedRoom.name}</Text>
          {selectedRoom.steps.map((step: string, idx: number) => (
            <Text key={idx} style={styles.steps}>• {step}</Text>
          ))}
        </View>
      )}

      {/* Back Buttons */}
      {selectedRoom && (
        <TouchableOpacity onPress={() => setSelectedRoom(null)}>
          <Text style={styles.back}>⬅ Back to Rooms</Text>
        </TouchableOpacity>
      )}
      {selectedFloor && !selectedRoom && (
        <TouchableOpacity onPress={() => setSelectedFloor(null)}>
          <Text style={styles.back}>⬅ Back to Floors</Text>
        </TouchableOpacity>
      )}
      {selectedBuilding && !selectedFloor && (
        <TouchableOpacity onPress={() => setSelectedBuilding(null)}>
          <Text style={styles.back}>⬅ Back to Buildings</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e0f2fe', // light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1e3a8a', // dark blue
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#1e40af', // medium blue
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  stepsCard: {
    backgroundColor: '#1e3a8a', // dark blue card for steps
  },
  place: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a', // dark blue text
  },
  steps: {
    marginTop: 8,
    fontSize: 14,
    color: '#fff', // white text for steps
  },
  back: {
    marginTop: 12,
    color: '#3b82f6', // bright blue for back button
    fontWeight: 'bold',
    fontSize: 14,
  },
  roomImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
});
