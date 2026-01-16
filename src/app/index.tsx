import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { items } from '@/store/mockStore';
import ItemCard from '@/components/ItemCard';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Items</Text>

      <Pressable style={styles.manageBtn} onPress={() => router.push('/locations')}>
        <Text style={styles.manageText}>Manage Locations</Text>
      </Pressable>

      <TextInput
        placeholder="Search items..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />

      {filteredItems.length === 0 ? (
        <Text style={styles.empty}>No items found. Tap + to add.</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={() => router.push(`/item/${item.id}`)}
            />
          )}
        />
      )}

      <Pressable style={styles.fab} onPress={() => router.push('/add-item')}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  manageBtn: {
    backgroundColor: '#e5e7eb',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  manageText: { fontWeight: '600' },
  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  empty: { textAlign: 'center', marginTop: 40, color: '#6b7280' },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: '#fff', fontSize: 28 },
});
