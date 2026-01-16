import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { tags } from '@/store/mockStore';

export default function TagsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Tags</Text>

            <Pressable style={styles.add} onPress={() => router.push('/tag-form')}>
                <Text style={styles.addText}>+ Add Tag</Text>
            </Pressable>

            <FlatList
                data={tags}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.row}
                        onPress={() => router.push(`/tag-form?id=${item.id}`)}
                    >
                        <Text style={styles.tagName}>#{item.name}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f3f4f6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    add: {
        backgroundColor: '#e5e7eb',
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
    },
    addText: {
        fontWeight: '600',
    },
    row: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    tagName: {
        fontSize: 16,
    },
});
