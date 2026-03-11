import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pets';

  getPets(filters?: { name?: string; species?: string; status?: string }): Observable<Pet[]> {
    let params = new HttpParams();

    if (filters?.name) params = params.set('name', filters.name);
    if (filters?.species) params = params.set('species', filters.species);
    if (filters?.status) params = params.set('status', filters.status);

    return this.http.get<Pet[]>(this.apiUrl, { params });
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
}