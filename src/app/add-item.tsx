import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
    items,
    tags,
    itemTags,
    updateItem,
    addItemTag,
    removeItemTag,
} from '@/store/mockStore';
import { getTagsForItem } from '@/utils/tagUtils';

export default function AddItemScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ id?: string }>();
    const existing = params.id ? items.find(i => i.id === params.id) : null;

    if (!existing) return null;

    const [name, setName] = useState(existing.name);
    const [notes, setNotes] = useState(existing.notes ?? '');

    const assignedTags = getTagsForItem(existing.id, tags, itemTags);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Item</Text>

            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Item name"
                style={styles.input}
            />

            <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Notes"
                style={styles.input}
            />

            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tags}>
                {tags.map(tag => {
                    const assigned = assignedTags.some(t => t.id === tag.id);

                    return (
                        <Pressable
                            key={tag.id}
                            onPress={() =>
                                assigned
                                    ? removeItemTag(existing.id, tag.id)
                                    : addItemTag(existing.id, tag.id)
                            }
                        >
                            <Text style={[styles.tag, assigned && styles.tagAssigned]}>
                                #{tag.name}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <Pressable
                style={styles.save}
                onPress={() => {
                    updateItem({
                        ...existing,
                        name,
                        notes,
                    });
                    router.back();
                }}
            >
                <Text style={styles.saveText}>Save</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 6,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    tag: {
        marginRight: 8,
        marginBottom: 6,
        color: '#374151',
    },
    tagAssigned: {
        color: '#2563eb',
        fontWeight: 'bold',
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
