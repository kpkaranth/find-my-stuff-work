import { View, Text, FlatList, StyleSheet } from 'react-native';
import { locations } from '@/store/mockStore';

const buildTree = (parentId: string | null, depth = 0) =>
  locations
    .filter(l => l.parentId === parentId)
    .flatMap(l => [
      { ...l, depth },
      ...buildTree(l.id, depth + 1),
    ]);

export default function LocationsScreen() {
  const tree = buildTree(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>

      <FlatList
        data={tree}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { paddingLeft: 16 + item.depth * 16 }]}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 6 },
});
