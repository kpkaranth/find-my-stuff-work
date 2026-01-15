import { View, Text, FlatList, StyleSheet } from 'react-native';
import { locations } from '@/store/mockStore';

export default function LocationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: { fontSize: 16 },
});
