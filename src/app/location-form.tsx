import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { locations, addLocation, updateLocation } from '@/store/mockStore';
import { useState } from 'react';

export default function LocationForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const existing = id ? locations.find(l => l.id === id) : null;
  const [name, setName] = useState(existing?.name ?? '');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{existing ? 'Edit Location' : 'Add Location'}</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Location name" />
      <Pressable style={styles.save} onPress={() => {
        existing ? updateLocation(existing.id, name, existing.parentId) : addLocation(name, null);
        router.back();
      }}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  save: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8 },
  saveText: { color: '#fff', textAlign: 'center' },
});
