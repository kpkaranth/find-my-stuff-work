import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { locations, archiveLocation } from '@/store/mockStore';
import { useRouter } from 'expo-router';

const buildTree = (parentId: string | null, depth = 0) =>
  locations.filter(l => l.parentId === parentId && !l.isArchived)
    .flatMap(l => [{ ...l, depth }, ...buildTree(l.id, depth + 1)]);

export default function Locations() {
  const router = useRouter();
  const tree = buildTree(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>

      <Pressable style={styles.add} onPress={() => router.push('/location-form')}>
        <Text>Add Location</Text>
      </Pressable>

      <FlatList
        data={tree}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={[styles.row, { paddingLeft: 16 + item.depth * 16 }]}>
            <Text>{item.name}</Text>
            <View style={styles.actions}>
              <Pressable onPress={() => router.push(`/location-form?id=${item.id}`)}>
                <Text>Edit</Text>
              </Pressable>
              <Pressable onPress={() => archiveLocation(item.id)}>
                <Text>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  add: { backgroundColor: '#e5e7eb', padding: 10, borderRadius: 8, marginBottom: 8 },
  row: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 6 },
  actions: { flexDirection: 'row', gap: 12 },
});
