export interface Item {
  id: string;
  name: string;
  locationId: string;
  imageUri: string;
  notes?: string;
  tags: string[];
  createdAt: string;
}
