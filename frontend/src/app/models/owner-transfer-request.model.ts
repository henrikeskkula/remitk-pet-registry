export interface OwnerTransferRequest {
  id: number;
  petId: number;
  currentOwnerId: number;
  newOwnerId: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  initiatedAt: string;
  resolvedAt?: string | null;
  responseMessage?: string | null;
}