import { Item } from '@/models/Item';
import { Location } from '@/models/Location';
import { Tag } from '@/models/Tag';
import { ItemTag } from '@/models/ItemTag';

export const locations: Location[] = [
  { id: 'loc-1', name: 'Bedroom', parentId: null, order: 1, isArchived: false, createdAt: '2026-01-16T00:00:00Z', updatedAt: '2026-01-16T00:00:00Z' },
  { id: 'loc-2', name: 'Wardrobe', parentId: 'loc-1', order: 1, isArchived: false, createdAt: '2026-01-16T00:00:00Z', updatedAt: '2026-01-16T00:00:00Z' },
  { id: 'loc-3', name: 'Drawer 1', parentId: 'loc-2', order: 1, isArchived: false, createdAt: '2026-01-16T00:00:00Z', updatedAt: '2026-01-16T00:00:00Z' },
];

export const tags: Tag[] = [
  { id: 'tag-1', name: 'important', color: '#ef4444', createdAt: '2026-01-16T00:00:00Z', updatedAt: '2026-01-16T00:00:00Z' },
  { id: 'tag-2', name: 'documents', color: '#3b82f6', createdAt: '2026-01-16T00:00:00Z', updatedAt: '2026-01-16T00:00:00Z' },
];

export const items: Item[] = [
  {
    id: 'item-1',
    name: 'Passport',
    locationId: 'loc-3',
    imageUri: 'https://via.placeholder.com/150',
    notes: 'Behind books',
    createdAt: '2026-01-16T00:00:00Z',
    updatedAt: '2026-01-16T00:00:00Z',
  },
];

export const itemTags: ItemTag[] = [
  { itemId: 'item-1', tagId: 'tag-1', createdAt: '2026-01-16T00:00:00Z' },
  { itemId: 'item-1', tagId: 'tag-2', createdAt: '2026-01-16T00:00:00Z' },
];
