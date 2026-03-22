import { ListResponse, toListResponse } from '../models/list-response.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pets';

  getPets(filters?: {
    microchipId?: number;
    name?: string;
    ownerId?: number;
    page?: number;
    size?: number;
    sortBy?: string;
  }): Observable<ListResponse<Pet>> {
    let params = new HttpParams();

    if (filters?.microchipId !== undefined) {
      params = params.set('microchipId', filters.microchipId);
    }

    if (filters?.name) {
      params = params.set('name', filters.name);
    }

    if (filters?.ownerId !== undefined) {
      params = params.set('ownerId', filters.ownerId);
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

    return this.http.get<unknown>(this.apiUrl, { params }).pipe(
      map(raw => toListResponse<Pet>(raw as any)));
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  createPet(payload: Partial<Pet>): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, payload);
  }

  updatePet(id: number, payload: Partial<Pet>): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, payload);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  normalizeListResponse<T>(response: ListResponse<T> | T[]): T[] {
    return Array.isArray(response) ? response : response.items;
  }
}
