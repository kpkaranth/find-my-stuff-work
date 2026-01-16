import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { items, tags as allTags } from '@/store/mockStore';

export default function AddItemScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const existing = params.id ? items.find(i => i.id === params.id) : null;

  const [name, setName] = useState(existing?.name ?? '');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [tags, setTags] = useState<string[]>(existing?.tags ?? []);

  const toggleTag = (tag: string) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{existing ? 'Edit Item' : 'Add Item'}</Text>

      <TextInput value={name} onChangeText={setName} placeholder="Item name" style={styles.input} />

      <Pressable style={styles.selector} onPress={() => router.push('/select-location')}>
        <Text>Select Location</Text>
      </Pressable>

      <View style={styles.tags}>
        {allTags.map(tag => (
          <Pressable key={tag} onPress={() => toggleTag(tag)}>
            <Text style={tags.includes(tag) ? styles.tagActive : styles.tag}>#{tag}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes"
        multiline
        style={[styles.input, { height: 80 }]}
      />

      <Pressable style={styles.save} onPress={() => router.back()}>
        <Text style={styles.saveText}>{existing ? 'Update Item' : 'Save Item'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  selector: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  tag: { marginRight: 8 },
  tagActive: { marginRight: 8, fontWeight: 'bold' },
  save: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8 },
  saveText: { color: '#fff', textAlign: 'center' },
});
