import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { items, locations } from '@/store/mockStore';
import { getLocationPath } from '@/utils/locationUtils';

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = items.find(i => i.id === id);

  if (!item) {
    return (
        <View style={styles.container}>
          <Text style={styles.error}>Item not found</Text>
        </View>
    );
  }

  const locationPath = getLocationPath(item.locationId, locations);

  return (
      <View style={styles.container}>
        <Image source={{ uri: item.imageUri }} style={styles.image} />

        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.location}>📍 {locationPath}</Text>

        {item.tags.length > 0 && (
            <View style={styles.tags}>
              {item.tags.map(tag => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
              ))}
            </View>
        )}

        {item.notes && (
            <View style={styles.notesBox}>
              <Text style={styles.notesTitle}>Notes</Text>
              <Text style={styles.notes}>{item.notes}</Text>
            </View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#e5e7eb',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  location: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#374151',
  },
  notesBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  notesTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  notes: {
    color: '#374151',
  },
  error: {
    textAlign: 'center',
    marginTop: 40,
    color: '#6b7280',
  },
});
