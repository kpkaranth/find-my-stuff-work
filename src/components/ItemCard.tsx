import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { tags, itemTags } from '@/store/mockStore';
import { getTagsForItem } from '@/utils/tagUtils';

export default function ItemCard({ item, locationPath, onPress, onTagPress, onLocationPress }: any) {
  const resolvedTags = getTagsForItem(item.id, tags, itemTags);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Pressable onPress={onLocationPress}>
          <Text style={styles.location}>📍 {locationPath}</Text>
        </Pressable>
        <View style={styles.tags}>
          {resolvedTags.map(tag => (
            <Pressable key={tag.id} onPress={() => onTagPress(tag.name)}>
              <Text style={[styles.tag, { color: tag.color }]}>#{tag.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12 },
  image: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  location: { color: '#2563eb', marginTop: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 },
  tag: { marginRight: 8, fontSize: 12 },
});
