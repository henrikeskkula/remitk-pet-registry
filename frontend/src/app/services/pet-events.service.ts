import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetEvent } from '../models/pet-event.model';

@Injectable({
  providedIn: 'root'
})
export class PetEventsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pet-events';

  getEventsByPetId(petId: number): Observable<PetEvent[]> {
    return this.http.get<PetEvent[]>(`${this.apiUrl}/pet/${petId}`);
  }
}