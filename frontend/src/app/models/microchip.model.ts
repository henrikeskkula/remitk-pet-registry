export type MicrochipStatus = 'FREE' | 'USED';

export interface Microchip {
  id: number;
  chipNumber: string;
  importer: string;
  status: MicrochipStatus;
  createdAt: string;
  updatedAt: string;
}