import { Location } from '@/models/Location';

export function getLocationPath(locationId: string, locations: Location[]): string {
  const map = new Map(locations.map(l => [l.id, l]));
  const path: string[] = [];

  let current = map.get(locationId);
  while (current) {
    path.unshift(current.name);
    current = current.parentId ? map.get(current.parentId) : undefined;
  }

  return path.join(' > ');
}
