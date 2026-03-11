export type PetSpecies = 'DOG' | 'CAT' | 'RABBIT';
export type PetSex = 'MALE' | 'FEMALE' | 'UNKNOWN';
export type PetStatus = 'ACTIVE' | 'MISSING' | 'DECEASED' | 'ABROAD';

export interface Pet {
  id: number;
  microchipId: number;
  ownerId?: number | null;
  species: PetSpecies;
  name?: string | null;
  sex: PetSex;
  birthDate?: string | null;
  breed?: string | null;
  color?: string | null;
  imageUrl?: string | null;
  status: PetStatus;
  createdAt: string;
  updatedAt: string;
}