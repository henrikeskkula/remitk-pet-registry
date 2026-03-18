export interface Owner {
  id: number;
  personalCode: string;
  firstName: string;
  lastName: string;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
}