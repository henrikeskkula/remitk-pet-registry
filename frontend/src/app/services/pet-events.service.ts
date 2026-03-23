import { ListResponse, toListResponse } from '../models/list-response.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PetEvent } from '../models/pet-event.model';

@Injectable({ providedIn: 'root' })
export class PetEventsService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/events';

  getEventsByPetId(petId: number): Observable<ListResponse<PetEvent>> {
    const params = new HttpParams().set('petId', petId);
    return this.http.get<unknown>(this.api, { params }).pipe(
      map(raw => toListResponse<PetEvent>(raw as any)));
  }

  createEvent(payload: {
    petId: number;
    type: string;
    description?: string;
    time?: string;
  }): Observable<PetEvent> {
    return this.http.post<PetEvent>(this.api, payload);
  }

  normalizeListResponse<T>(response: ListResponse<T> | T[]): T[] {
    return Array.isArray(response) ? response : response.items;
  }
}
