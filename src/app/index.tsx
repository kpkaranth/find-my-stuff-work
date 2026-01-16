import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { items, locations, tags, itemTags } from '@/store/mockStore';
import ItemCard from '@/components/ItemCard';
import { getLocationPath, getDescendantLocationIds } from '@/utils/locationUtils';

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tag?: string; locationId?: string }>();
  const [query, setQuery] = useState('');

  const tagId = params.tag ? tags.find(t => t.name === params.tag)?.id : null;
  const locationIds = params.locationId
    ? getDescendantLocationIds(params.locationId, locations)
    : null;

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesTag = tagId
      ? itemTags.some(j => j.itemId === item.id && j.tagId === tagId)
      : true;
    const matchesLocation = locationIds ? locationIds.includes(item.locationId) : true;
    return matchesSearch && matchesTag && matchesLocation;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Items</Text>

      <Pressable style={styles.manage} onPress={() => router.push('/locations')}>
        <Text style={styles.manageText}>Manage Locations</Text>
      </Pressable>

      {(params.tag || params.locationId) && (
        <Pressable style={styles.clear} onPress={() => router.replace('/')}>
          <Text>Clear filters</Text>
        </Pressable>
      )}

      <TextInput
        placeholder="Search items"
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            locationPath={getLocationPath(item.locationId, locations)}
            onPress={() => router.push(`/item/${item.id}`)}
            onTagPress={tag => router.push(`/?tag=${tag}`)}
            onLocationPress={() => router.push(`/?locationId=${item.locationId}`)}
          />
        )}
      />

      <Pressable style={styles.fab} onPress={() => router.push('/add-item')}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  manage: { backgroundColor: '#e5e7eb', padding: 10, borderRadius: 8, marginBottom: 8 },
  manageText: { fontWeight: '600' },
  search: { backgroundColor: '#fff', padding: 12, borderRadius: 8 },
  clear: { backgroundColor: '#e5e7eb', padding: 8, borderRadius: 8, marginBottom: 8 },
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
