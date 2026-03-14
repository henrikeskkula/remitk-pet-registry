import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/owners';

  getOwners(filters?: {
    personalCode?: string;
    name?: string;
    page?: number;
    size?: number;
    sortBy?: string;
  }): Observable<Owner[]> {
    let params = new HttpParams();

    if (filters?.personalCode) {
      params = params.set('personalCode', filters.personalCode);
    }

    if (filters?.name) {
      params = params.set('name', filters.name);
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

    return this.http.get<Owner[]>(this.apiUrl, { params });
  }

  getOwnerById(id: number): Observable<Owner> {
    return this.http.get<Owner>(`${this.apiUrl}/${id}`);
  }

  createOwner(payload: Partial<Owner>): Observable<Owner> {
    return this.http.post<Owner>(this.apiUrl, payload);
  }

  updateOwner(id: number, payload: Partial<Owner>): Observable<Owner> {
    return this.http.put<Owner>(`${this.apiUrl}/${id}`, payload);
  }

  getOwnerPets(id: number, paramsData?: {
    page?: number;
    size?: number;
    sortBy?: string;
  }): Observable<Pet[]> {
    let params = new HttpParams();

    if (paramsData?.page !== undefined) {
      params = params.set('page', paramsData.page);
    }

    if (paramsData?.size !== undefined) {
      params = params.set('size', paramsData.size);
    }

    if (paramsData?.sortBy) {
      params = params.set('sortBy', paramsData.sortBy);
    }

    return this.http.get<Pet[]>(`${this.apiUrl}/${id}/pets`, { params });
  }
}