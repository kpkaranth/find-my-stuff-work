import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function ItemCard({ item, locationPath, onPress }: any) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>📍 {locationPath}</Text>
        <Text style={styles.tags}>
          {item.tags.map((t: string) => `#${t}`).join(' ')}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  location: { color: '#374151', marginTop: 4 },
  tags: { color: '#6b7280', marginTop: 4, fontSize: 12 },
});
