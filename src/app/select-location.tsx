import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { locations } from '@/store/mockStore';
import { useRouter, useLocalSearchParams } from 'expo-router';

const buildTree = (parentId: string | null, depth = 0) =>
    locations
        .filter(l => l.parentId === parentId && !l.isArchived)
        .flatMap(l => [
            { ...l, depth },
            ...buildTree(l.id, depth + 1),
        ]);

export default function SelectLocationScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ itemId: string }>();

    const tree = buildTree(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Location</Text>

            <FlatList
                data={tree}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        style={[styles.row, { paddingLeft: 16 + item.depth * 16 }]}
                        onPress={() =>
                            router.replace(
                                `/add-item?id=${params.itemId}&locationId=${item.id}`
                            )
                        }
                    >
                        <Text>{item.name}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    row: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 6,
    },
});
