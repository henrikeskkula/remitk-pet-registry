import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerTransferRequest } from '../models/owner-transfer-request.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerTransferRequestsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/owner-transfer-requests';

  getRequests(): Observable<OwnerTransferRequest[]> {
    return this.http.get<OwnerTransferRequest[]>(this.apiUrl);
  }

  createRequest(payload: Partial<OwnerTransferRequest>): Observable<OwnerTransferRequest> {
    return this.http.post<OwnerTransferRequest>(this.apiUrl, payload);
  }
}