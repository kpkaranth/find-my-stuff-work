import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { locations } from '../store/mockStore';

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const router = useRouter();

  const takePhoto = async () => {
    await ImagePicker.launchCameraAsync({ quality: 0.7 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Item</Text>

      <TextInput
        placeholder="Item name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Location</Text>
      <Text style={styles.location}>{locations[0].name}</Text>

      <Pressable style={styles.button} onPress={takePhoto}>
        <Text>Take Placement Photo</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.save]} onPress={() => router.back()}>
        <Text style={styles.saveText}>Save Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8 },
  label: { marginTop: 16, fontWeight: '600' },
  location: { marginTop: 6, color: '#374151' },
  button: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  save: { backgroundColor: '#2563eb' },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
