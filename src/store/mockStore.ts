import { Item } from '@/models/Item';
import { Location } from '@/models/Location';
import { Tag } from '@/models/Tag';
import { ItemTag } from '@/models/ItemTag';

const now = () => new Date().toISOString();

/* =======================
   LOCATIONS
======================= */

export const locations: Location[] = [
  {
    id: 'loc-1',
    name: 'Bedroom',
    parentId: null,
    isArchived: false,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'loc-2',
    name: 'Wardrobe',
    parentId: 'loc-1',
    isArchived: false,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'loc-3',
    name: 'Drawer 1',
    parentId: 'loc-2',
    isArchived: false,
    createdAt: now(),
    updatedAt: now(),
  },
];

export function addLocation(name: string, parentId: string | null) {
  locations.push({
    id: 'loc-' + Math.random().toString(36).slice(2),
    name,
    parentId,
    isArchived: false,
    createdAt: now(),
    updatedAt: now(),
  });
}

export function updateLocation(
    id: string,
    name: string,
    parentId: string | null
) {
  if (id === parentId) return;
  const loc = locations.find(l => l.id === id);
  if (!loc) return;

  loc.name = name;
  loc.parentId = parentId;
  loc.updatedAt = now();
}

export function archiveLocation(id: string) {
  const loc = locations.find(l => l.id === id);
  if (!loc) return;

  loc.isArchived = true;
  loc.updatedAt = now();

  // cascade archive
  locations
      .filter(l => l.parentId === id)
      .forEach(child => archiveLocation(child.id));
}

/* =======================
   ITEMS
======================= */

export const items: Item[] = [
  {
    id: 'item-1',
    name: 'Passport',
    locationId: 'loc-3',
    imageUri: 'https://via.placeholder.com/150',
    notes: 'Behind books',
    createdAt: now(),
    updatedAt: now(),
  },
];

export function updateItem(updated: Item) {
  const index = items.findIndex(i => i.id === updated.id);
  if (index === -1) return;

  items[index] = {
    ...updated,
    updatedAt: now(),
  };
}

/* =======================
   TAGS
======================= */

export const tags: Tag[] = [
  {
    id: 'tag-1',
    name: 'important',
    color: '#ef4444',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'tag-2',
    name: 'documents',
    color: '#3b82f6',
    createdAt: now(),
    updatedAt: now(),
  },
];

export function addTag(name: string, color?: string) {
  if (!name.trim()) return;

  tags.push({
    id: 'tag-' + Math.random().toString(36).slice(2),
    name,
    color,
    createdAt: now(),
    updatedAt: now(),
  });
  return tags;
}

export function updateTag(id: string, name: string, color?: string) {
  const tag = tags.find(t => t.id === id);
  if (!tag) return;

  tag.name = name;
  tag.color = color;
  tag.updatedAt = now();
}

/* =======================
   ITEM ↔ TAG JOIN
======================= */

export const itemTags: ItemTag[] = [
  {
    itemId: 'item-1',
    tagId: 'tag-1',
    createdAt: now(),
  },
];

export function addItemTag(itemId: string, tagId: string) {
  const exists = itemTags.some(
      j => j.itemId === itemId && j.tagId === tagId
  );
  if (exists) return;

  itemTags.push({
    itemId,
    tagId,
    createdAt: now(),
  });
}

export function removeItemTag(itemId: string, tagId: string) {
  const index = itemTags.findIndex(
      j => j.itemId === itemId && j.tagId === tagId
  );
  if (index !== -1) {
    itemTags.splice(index, 1);
  }
}

export function addItem(input: {
  name: string;
  notes?: string;
  locationId: string;
}) {
  items.push({
    id: 'item-' + Math.random().toString(36).slice(2),
    name: input.name,
    notes: input.notes,
    locationId: input.locationId,
    imageUri: 'https://via.placeholder.com/150',
    createdAt: now(),
    updatedAt: now(),
  });
}