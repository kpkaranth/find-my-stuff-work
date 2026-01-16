export interface Item {
  id: string;
  name: string;
  locationId: string;
  imageUri: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}
