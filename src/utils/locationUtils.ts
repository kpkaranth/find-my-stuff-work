import { Location } from '@/models/Location';

export function getLocationPath(id: string, locations: Location[]): string {
  const map = new Map(locations.map(l => [l.id, l]));
  const path: string[] = [];
  let cur = map.get(id);
  while (cur) {
    path.unshift(cur.name);
    cur = cur.parentId ? map.get(cur.parentId) : undefined;
  }
  return path.join(' > ');
}

export function getDescendantLocationIds(id: string, locations: Location[]): string[] {
  const result = [id];
  locations.filter(l => l.parentId === id && !l.isArchived)
    .forEach(c => result.push(...getDescendantLocationIds(c.id, locations)));
  return result;
}
