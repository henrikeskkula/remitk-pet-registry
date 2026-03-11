import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/owners';

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.apiUrl);
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
}