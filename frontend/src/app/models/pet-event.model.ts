export type PetEventType =
  | 'MARKED_MISSING'
  | 'MARKED_FOUND'
  | 'TRANSFER_INITIATED'
  | 'TRANSFER_ACCEPTED'
  | 'TRANSFER_REJECTED';

export const PET_EVENT_TYPE_LABELS: Record<PetEventType, string> = {
  MARKED_MISSING: 'Märgitud kadunuks',
  MARKED_FOUND: 'Märgitud leituks',
  TRANSFER_INITIATED: 'Üleandmine algatatud',
  TRANSFER_ACCEPTED: 'Üleandmine kinnitatud',
  TRANSFER_REJECTED: 'Üleandmine tagasi lükatud'
};

export function getPetEventTypeLabel(type: PetEventType): string {
  return PET_EVENT_TYPE_LABELS[type] ?? type;
}

export interface PetEvent {
  id: number;
  petId: number;
  type: PetEventType;
  time: string;
  performedByRole: string;
  description?: string | null;
  metadata?: string | null;
  createdAt: string;
}