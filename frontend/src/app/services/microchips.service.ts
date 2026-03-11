import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Microchip } from '../models/microchip.model';

@Injectable({
  providedIn: 'root'
})
export class MicrochipsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/microchips';

  getMicrochips(): Observable<Microchip[]> {
    return this.http.get<Microchip[]>(this.apiUrl);
  }

  getMicrochipById(id: number): Observable<Microchip> {
    return this.http.get<Microchip>(`${this.apiUrl}/${id}`);
  }

  checkByChipNumber(chipNumber: string): Observable<Microchip> {
    return this.http.get<Microchip>(`${this.apiUrl}/check/${chipNumber}`);
  }
}