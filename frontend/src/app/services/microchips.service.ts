import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Microchip } from '../models/microchip.model';

@Injectable({
  providedIn: 'root'
})
export class MicrochipsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/microchips';

  getMicrochips(filters?: {
    chipNumber?: string;
    importer?: string;
    page?: number;
    size?: number;
    sortBy?: string;
  }): Observable<Microchip[]> {
    let params = new HttpParams();

    if (filters?.chipNumber) {
      params = params.set('chipNumber', filters.chipNumber);
    }

    if (filters?.importer) {
      params = params.set('importer', filters.importer);
    }

    if (filters?.page !== undefined) {
      params = params.set('page', filters.page);
    }

    if (filters?.size !== undefined) {
      params = params.set('size', filters.size);
    }

    if (filters?.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }

    return this.http.get<Microchip[]>(this.apiUrl, { params });
  }

  getMicrochipById(id: number): Observable<Microchip> {
    return this.http.get<Microchip>(`${this.apiUrl}/${id}`);
  }

  createMicrochip(payload: {
    chipNumber: string;
    importer: string;
  }): Observable<Microchip> {
    return this.http.post<Microchip>(this.apiUrl, payload);
  }

  updateMicrochipStatus(id: number, status: 'FREE' | 'USED'): Observable<Microchip> {
    return this.http.put<Microchip>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteMicrochip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}