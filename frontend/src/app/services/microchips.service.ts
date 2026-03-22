import { ListResponse, toListResponse } from '../models/list-response.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Microchip } from '../models/microchip.model';

@Injectable({ providedIn: 'root' })
export class MicrochipsService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/microchips';

  getMicrochips(filters: { chipNumber?: string; importer?: string; page?: number; size?: number; sortBy?: string }): Observable<ListResponse<Microchip>> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<unknown>(this.api, { params }).pipe(
      map(raw => toListResponse<Microchip>(raw as any)));
  }

  getMicrochip(id: number): Observable<Microchip> {
    return this.http.get<Microchip>(`${this.api}/${id}`);
  }

  createMicrochip(data: Partial<Microchip>): Observable<Microchip> {
    return this.http.post<Microchip>(this.api, data);
  }

  updateStatus(id: number, status: string): Observable<Microchip> {
    return this.http.put<Microchip>(`${this.api}/${id}/status`, { status });
  }

  deleteMicrochip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  normalizeListResponse<T>(response: ListResponse<T> | T[]): T[] {
  return Array.isArray(response) ? response : response.items;
  }
}