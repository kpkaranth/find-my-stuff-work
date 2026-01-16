import { Tag } from '@/models/Tag';
import { ItemTag } from '@/models/ItemTag';

export function getTagsForItem(itemId: string, tags: Tag[], joins: ItemTag[]) {
  const ids = joins.filter(j => j.itemId === itemId).map(j => j.tagId);
  return tags.filter(t => ids.includes(t.id));
}
