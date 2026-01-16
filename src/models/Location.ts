export interface Location {
  id: string;
  name: string;
  parentId: string | null;
  order?: number | null;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
