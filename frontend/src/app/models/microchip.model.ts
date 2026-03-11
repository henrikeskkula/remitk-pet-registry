export interface Microchip {
  id: number;
  chipNumber: string;
  importer: string;
  status: 'FREE' | 'USED';
}