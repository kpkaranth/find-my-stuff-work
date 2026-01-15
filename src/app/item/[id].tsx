import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { items } from '@/store/mockStore';

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const item = items.find((i) => i.id === id);

  if (!item) {
    return <Text>Item not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>📍 {item.locationName}</Text>

        <Pressable style={styles.delete}>
          <Text style={styles.deleteText}>Delete Item</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 260 },
  content: { padding: 16 },
  name: { fontSize: 22, fontWeight: 'bold' },
  location: { marginTop: 8, color: '#6b7280' },
  delete: {
    marginTop: 24,
    backgroundColor: '#dc2626',
    padding: 14,
    borderRadius: 10,
  },
  deleteText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
