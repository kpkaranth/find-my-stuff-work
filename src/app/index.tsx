import {View, Text, FlatList, StyleSheet, Pressable, TextInput} from 'react-native';
import {useRouter, useLocalSearchParams} from 'expo-router';
import {useState} from 'react';
import {items, locations, tags, itemTags} from '@/store/mockStore';
import ItemCard from '@/components/ItemCard';
import {getLocationPath, getDescendantLocationIds} from '@/utils/locationUtils';

export default function Home() {
    const router = useRouter();
    const params = useLocalSearchParams<{ tag?: string; locationId?: string }>();
    const [query, setQuery] = useState('');

    const tagId = params.tag ? tags.find(t => t.name === params.tag)?.id : null;
    const locationIds = params.locationId ? getDescendantLocationIds(params.locationId, locations) : null;

    const filtered = items.filter(i => {
        const matchSearch = i.name.toLowerCase().includes(query.toLowerCase());
        const matchTag = tagId ? itemTags.some(j => j.itemId === i.id && j.tagId === tagId) : true;
        const matchLoc = locationIds ? locationIds.includes(i.locationId) : true;
        return matchSearch && matchTag && matchLoc;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Items</Text>

            <View style={{flexDirection: 'row', gap: 8}}>
                <Pressable style={styles.manage} onPress={() => router.push('/locations')}>
                    <Text style={styles.manageText}>Manage Locations</Text>
                </Pressable>

                <Pressable style={styles.manage} onPress={() => router.push('/tags')}>
                    <Text style={styles.manageText}>Manage Tags</Text>
                </Pressable>
            </View>

            <TextInput
                placeholder="Search items or tags"
                value={query}
                onChangeText={setQuery}
                style={styles.search}
            />

            <FlatList
                data={filtered}
                keyExtractor={i => i.id}
                renderItem={({item}) => (
                    <ItemCard
                        item={item}
                        locationPath={getLocationPath(item.locationId, locations)}
                        onPress={() => router.push(`/item/${item.id}`)}
                        onTagPress={tag => router.push(`/?tag=${tag}`)}
                        onLocationPress={() => router.push(`/?locationId=${item.locationId}`)}
                    />
                )}
            />

            <Pressable
                style={styles.fab}
                onPress={() => router.push('/add-item')}
            >
                <Text style={styles.fabText}>＋</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, backgroundColor: '#f3f4f6'},
    title: {fontSize: 24, fontWeight: 'bold', marginBottom: 8},
    manage: {backgroundColor: '#e5e7eb', padding: 10, borderRadius: 8, marginBottom: 8},
    manageText: {fontWeight: '600'},
    search: {backgroundColor: '#fff', padding: 12, borderRadius: 8},
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4, // Android
        shadowColor: '#000', // iOS
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 2},
    },
    fabText: {
        color: '#fff',
        fontSize: 28,
        lineHeight: 30,
        fontWeight: '600',
    },
});
