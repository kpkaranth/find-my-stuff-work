import { View, Text, FlatList, TextInput, Pressable, StyleSheet } from 'react-native';
import { locations } from '@/store/mockStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SelectLocationScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = locations.filter(l =>
    l.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Location</Text>

      <TextInput
        placeholder="Search locations..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => router.back()}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  search: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
});
