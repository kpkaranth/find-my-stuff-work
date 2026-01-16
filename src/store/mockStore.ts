import { Item } from '@/models/Item';
import { Location } from '@/models/Location';

export const locations: Location[] = [
  { id: 'loc-1', name: 'Bedroom Drawer', createdAt: new Date().toISOString() },
  { id: 'loc-2', name: 'Kitchen Cabinet', createdAt: new Date().toISOString() },
];

export const items: Item[] = [
  {
    id: 'item-1',
    name: 'Passport',
    locationId: 'loc-1',
    locationName: 'Bedroom Drawer',
    imageUri: 'https://via.placeholder.com/150',
    notes: 'Behind books',
    createdAt: new Date().toISOString(),
  },
];
