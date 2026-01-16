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

export function getDescendantLocationIds(locationId: string, locations: Location[]): string[] {
  const result: string[] = [locationId];
  locations
    .filter(l => l.parentId === locationId && !l.isArchived)
    .forEach(child => result.push(...getDescendantLocationIds(child.id, locations)));
  return result;
}
