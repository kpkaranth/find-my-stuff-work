import { Item } from '@/models/Item';
import { Location } from '@/models/Location';

export const locations: Location[] = [
  { id: 'loc-1', name: 'Bedroom', parentId: null, createdAt: new Date().toISOString() },
  { id: 'loc-2', name: 'Wardrobe', parentId: 'loc-1', createdAt: new Date().toISOString() },
  { id: 'loc-3', name: 'Drawer 1', parentId: 'loc-2', createdAt: new Date().toISOString() },
  { id: 'loc-4', name: 'Kitchen', parentId: null, createdAt: new Date().toISOString() },
];

export const tags = ['important', 'documents', 'electronics'];

export const items: Item[] = [
  {
    id: 'item-1',
    name: 'Passport',
    locationId: 'loc-3',
    imageUri: 'https://via.placeholder.com/150',
    notes: 'Behind books',
    tags: ['important', 'documents'],
    createdAt: new Date().toISOString(),
  },
];
