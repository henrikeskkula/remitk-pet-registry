export type MicrochipStatus = 'FREE' | 'USED';

export const MICROCHIP_STATUS_LABELS: Record<MicrochipStatus, string> = {
  FREE: 'Vaba',
  USED: 'Kasutatud'
};

export function getMicrochipStatusLabel(status: MicrochipStatus): string {
  return MICROCHIP_STATUS_LABELS[status] ?? status;
}

export interface Microchip {
  id: number;
  chipNumber: string;
  importer: string;
  status: MicrochipStatus;
  createdAt: string;
  updatedAt: string;
}