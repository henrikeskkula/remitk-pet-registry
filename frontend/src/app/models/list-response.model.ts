export interface ListResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  sortBy: string;
  direction: string;
}

type RawListResponse<T> = {
  items?: T[];
  content?: T[];
  data?: T[];
  pets?: T[];
  owners?: T[];
  microchips?: T[];
  events?: T[];
  petEvents?: T[];
  page?: number;
  size?: number;
  totalPages?: number;
  totalElements?: number;
  sortBy?: string;
  direction?: string;
};

export function toListResponse<T>(raw: RawListResponse<T> | T[]): ListResponse<T> {
  if (Array.isArray(raw)) {
    return {
      items: raw,
      page: 0,
      size: raw.length,
      totalPages: 1,
      totalElements: raw.length,
      sortBy: 'id',
      direction: 'asc'
    };
  }

  const items =
    raw.items ??
    raw.pets ??
    raw.owners ??
    raw.microchips ??
    raw.events ??
    raw.petEvents ??
    raw.content ??
    raw.data ??
    [];

  return {
    items,
    page: raw.page ?? 0,
    size: raw.size ?? items.length,
    totalPages: raw.totalPages ?? 1,
    totalElements: raw.totalElements ?? items.length,
    sortBy: raw.sortBy ?? 'id',
    direction: raw.direction ?? 'asc'
  };
}