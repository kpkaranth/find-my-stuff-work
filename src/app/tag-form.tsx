import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { tags, addTag, updateTag } from '@/store/mockStore';

export default function TagFormScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string }>();

    const existing = id ? tags.find(t => t.id === id) : null;
    const [name, setName] = useState(existing?.name ?? '');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {existing ? 'Edit Tag' : 'Add Tag'}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Tag name"
                value={name}
                onChangeText={setName}
            />

            <Pressable
                style={styles.save}
                onPress={() => {
                    if (!name.trim()) return;

                    existing
                        ? updateTag(existing.id, name.trim())
                        : addTag(name.trim());

                    router.back();
                }}
            >
                <Text style={styles.saveText}>Save</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    save: {
        backgroundColor: '#2563eb',
        padding: 14,
        borderRadius: 8,
    },
    saveText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
});
