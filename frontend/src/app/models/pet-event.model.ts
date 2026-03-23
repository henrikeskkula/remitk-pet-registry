export interface PetEvent {
  id: number;
  petId: number;
  type: string;
  time: string;
  performedByRole: string;
  description?: string | null;
  metadata?: string | null;
  createdAt: string;
}