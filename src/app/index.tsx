import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { items } from '@/store/mockStore';
import ItemCard from '@/components/ItemCard';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Items</Text>
        <Pressable
            style={styles.locationsButton}
            onPress={() => router.push('/locations')}
        >
            <Text style={styles.locationsText}>Manage Locations</Text>
        </Pressable>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => router.push(`/item/${item.id}`)}
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
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
    locationsButton: {
        backgroundColor: '#e5e7eb',
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
    },
    locationsText: {
        fontWeight: '600',
    },
});
