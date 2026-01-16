import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function AddItemScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [location, setLocation] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

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

      <Pressable
        style={styles.selector}
        onPress={() => router.push('/select-location')}
      >
        <Text>{location ?? 'Select Location'}</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={takePhoto}>
        <Text>Take Placement Photo</Text>
      </Pressable>

      <TextInput
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Pressable
        style={[styles.button, styles.save]}
        disabled={!name || !location}
        onPress={() => router.back()}
      >
        <Text style={styles.saveText}>Save Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  selector: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  button: {
    marginTop: 12,
    padding: 14,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  save: { backgroundColor: '#2563eb' },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
