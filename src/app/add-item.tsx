import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { items } from '@/store/mockStore';

export default function AddItemScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const existing = params.id ? items.find(i => i.id === params.id) : null;

  const [name, setName] = useState(existing?.name ?? '');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{existing ? 'Edit Item' : 'Add Item'}</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Item name"
        style={styles.input}
      />

      <Pressable style={styles.save} onPress={() => router.back()}>
        <Text style={styles.saveText}>
          {existing ? 'Update Item' : 'Save Item'}
        </Text>
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
