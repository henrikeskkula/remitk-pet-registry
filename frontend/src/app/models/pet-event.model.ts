export interface PetEvent {
  id: number;
  petId: number;
  eventType: string;
  eventTimestamp: string;
  performedByRole: string;
  description?: string | null;
  metadata?: string | null;
  createdAt: string;
}