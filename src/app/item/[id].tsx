import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { items, locations, tags, itemTags } from '@/store/mockStore';
import { getLocationPath } from '@/utils/locationUtils';
import { getTagsForItem } from '@/utils/tagUtils';

export default function ItemDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = items.find(i => i.id === id);

  if (!item) return <Text>Item not found</Text>;

  const resolvedTags = getTagsForItem(item.id, tags, itemTags);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.location}>📍 {getLocationPath(item.locationId, locations)}</Text>

      <View style={styles.tags}>
        {resolvedTags.map(t => (
          <Pressable key={t.id} onPress={() => router.push(`/?tag=${t.name}`)}>
            <Text style={styles.tag}>#{t.name}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.edit} onPress={() => router.push(`/item/${id}/edit`)}>
        <Text style={styles.editText}>Edit Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: '100%', height: 220, borderRadius: 12 },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 12 },
  location: { color: '#2563eb', marginVertical: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: { marginRight: 8 },
  edit: { marginTop: 24, backgroundColor: '#2563eb', padding: 14, borderRadius: 8 },
  editText: { color: '#fff', textAlign: 'center' },
});
