export interface Pet {
  id: number;
  microchipId: number;
  ownerId: number | null;
  species: 'DOG' | 'CAT' | 'FERRET';
  name: string | null;
  sex: 'MALE' | 'FEMALE' | 'UNKNOWN';
  birthDate?: string;
  breed?: string;
  color?: string;
  imageUrl?: string;
  status: 'ACTIVE' | 'MISSING' | 'DECEASED' | 'ABROAD';
}