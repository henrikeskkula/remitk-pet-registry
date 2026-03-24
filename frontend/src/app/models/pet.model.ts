export type PetSpecies = 'DOG' | 'CAT' | 'FERRET';
export type PetSex = 'MALE' | 'FEMALE' | 'UNKNOWN';
export type PetStatus = 'ACTIVE' | 'MISSING' | 'DECEASED' | 'ABROAD';

export const PET_SPECIES_LABELS: Record<PetSpecies, string> = {
  DOG: 'Koer',
  CAT: 'Kass',
  FERRET: 'Tuhkur'
};

export const PET_SEX_LABELS: Record<PetSex, string> = {
  MALE: 'Isane',
  FEMALE: 'Emane',
  UNKNOWN: 'Teadmata'
};

export const PET_STATUS_LABELS: Record<PetStatus, string> = {
  ACTIVE: 'Aktiivne',
  MISSING: 'Kadunud',
  DECEASED: 'Surnud',
  ABROAD: 'Välismaal'
};

export function getPetSpeciesLabel(species: PetSpecies): string {
  return PET_SPECIES_LABELS[species] ?? species;
}

export function getPetSexLabel(sex: PetSex): string {
  return PET_SEX_LABELS[sex] ?? sex;
}

export function getPetStatusLabel(status: PetStatus): string {
  return PET_STATUS_LABELS[status] ?? status;
}

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