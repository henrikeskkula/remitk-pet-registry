import { ListResponse, toListResponse } from '../models/list-response.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Owner } from '../models/owner.model';
import { Pet } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class OwnersService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/owners';

  getOwners(filters: { personalCode?: string; name?: string; page?: number; size?: number; sortBy?: string }): Observable<ListResponse<Owner>> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<unknown>(this.api, { params }).pipe(
      map(raw => toListResponse<Owner>(raw as any)));
  }

  getOwner(id: number): Observable<Owner> {
    return this.http.get<Owner>(`${this.api}/${id}`);
  }

  createOwner(owner: Partial<Owner>): Observable<Owner> {
    return this.http.post<Owner>(this.api, owner);
  }

  updateOwner(id: number, owner: Partial<Owner>): Observable<Owner> {
    return this.http.put<Owner>(`${this.api}/${id}`, owner);
  }

  deleteOwner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getOwnerPets(id: number, page = 0, size = 10, sortBy = 'id'): Observable<ListResponse<Pet>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy);

    return this.http.get<unknown>(`${this.api}/${id}/pets`, { params }).pipe(
      map(raw => toListResponse<Pet>(raw as any)));
  }

  normalizeListResponse<T>(response: ListResponse<T> | T[]): T[] {
    return Array.isArray(response) ? response : response.items;
  }
}