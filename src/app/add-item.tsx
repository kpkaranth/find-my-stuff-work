import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { tags as allTags } from '@/store/mockStore';

export default function AddItemScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

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

      <Pressable style={styles.selector} onPress={() => router.push('/select-location')}>
        <Text>Select Location</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={takePhoto}>
        <Text>Take Placement Photo</Text>
      </Pressable>

      <Text style={styles.section}>Tags</Text>
      <View style={styles.tags}>
        {allTags.map(tag => (
          <Pressable
            key={tag}
            style={[styles.tag, tags.includes(tag) && styles.tagActive]}
            onPress={() => toggleTag(tag)}
          >
            <Text>{tag}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Pressable style={[styles.button, styles.save]} onPress={() => router.back()}>
        <Text style={styles.saveText}>Save Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  selector: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { padding: 14, backgroundColor: '#e5e7eb', borderRadius: 8, marginBottom: 12 },
  save: { backgroundColor: '#2563eb' },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  section: { fontWeight: '600', marginBottom: 6 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  tag: { backgroundColor: '#e5e7eb', padding: 8, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  tagActive: { backgroundColor: '#93c5fd' },
});
