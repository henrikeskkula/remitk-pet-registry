import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetEvent } from '../models/pet-event.model';

@Injectable({ providedIn: 'root' })
export class PetEventsService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/events';

  getEventsByPetId(petId: number): Observable<any> {
    const params = new HttpParams().set('petId', petId);
    return this.http.get<any>(this.api, { params });
  }

  createEvent(payload: {
    petId: number;
    eventType: string;
    description?: string;
    eventTimestamp?: string;
  }): Observable<PetEvent> {
    return this.http.post<PetEvent>(this.api, payload);
  }

  normalizeListResponse<T>(response: any): T[] {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.content)) return response.content;
    if (Array.isArray(response?.items)) return response.items;
    if (Array.isArray(response?.data)) return response.data;
    return [];
  }
}
