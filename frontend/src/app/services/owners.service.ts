import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Owner } from '../models/owner.model';
import { Pet } from '../models/pet.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OwnersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/owners`;

  getOwners(filters: { personalCode?: string; name?: string; page?: number; size?: number; sortBy?: string }): Observable<Owner[]> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(res=> this.normalizeListResponse<Owner>(res))
    );
  }

  getOwner(id: number): Observable<Owner> {
    return this.http.get<Owner>(`${this.apiUrl}/${id}`);
  }

  createOwner(owner: Partial<Owner>): Observable<Owner> {
    return this.http.post<Owner>(this.apiUrl, owner);
  }

  updateOwner(id: number, owner: Partial<Owner>): Observable<Owner> {
    return this.http.put<Owner>(`${this.apiUrl}/${id}`, owner);
  }

  deleteOwner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOwnerPets(id: number, page = 0, size = 10, sortBy = 'id'): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size))
      .set('sortBy', sortBy);

    return this.http.get<any>(`${this.apiUrl}/${id}/pets`, { params }).pipe(
      map(res => this.normalizeListResponse<Pet>(res))
    );
  }

  normalizeListResponse<T>(response: any): T[] {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.content)) return response.content;
    if (Array.isArray(response?.items)) return response.items;
    if (Array.isArray(response?.data)) return response.data;
    return [];
  }
}