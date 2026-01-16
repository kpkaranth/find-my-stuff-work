import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from 'react-native';
import { locations } from '@/store/mockStore';
import { useState } from 'react';

export default function LocationsScreen() {
  const [newLoc, setNewLoc] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <TextInput
        placeholder="Add new location"
        value={newLoc}
        onChangeText={setNewLoc}
        style={styles.input}
      />

      <Pressable style={styles.addBtn}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Add Location</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  addBtn: {
    marginTop: 10,
    padding: 14,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
});
