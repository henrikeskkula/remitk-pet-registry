import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';
import { Pet } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class OwnersService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/owners';

  getOwners(filters: { personalCode?: string; name?: string; page?: number; size?: number; sortBy?: string }): Observable<any> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<any>(this.api, { params });
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

  getOwnerPets(id: number, page = 0, size = 10, sortBy = 'id'): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy);

    return this.http.get<any>(`${this.api}/${id}/pets`, { params });
  }

  normalizeListResponse<T>(response: any): T[] {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.content)) return response.content;
    if (Array.isArray(response?.items)) return response.items;
    if (Array.isArray(response?.data)) return response.data;
    return [];
  }
}