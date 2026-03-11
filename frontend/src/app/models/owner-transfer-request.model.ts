export type TransferRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

export interface OwnerTransferRequest {
  id: number;
  petId: number;
  currentOwnerId: number;
  newOwnerId: number;
  status: TransferRequestStatus;
  initiatedAt: string;
  resolvedAt?: string | null;
  responseMessage?: string | null;
  createdAt: string;
}