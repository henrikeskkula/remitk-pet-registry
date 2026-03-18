import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerTransferRequest } from '../models/owner-transfer-request.model';

@Injectable({ providedIn: 'root' })
export class OwnerTransferRequestsService {
  private http = inject(HttpClient);
  private petsApi = 'http://localhost:8080/api/pets';
  private transfersApi = 'http://localhost:8080/api/transfers';

  createTransfer(petId: number, newOwnerId: number): Observable<OwnerTransferRequest> {
    return this.http.post<OwnerTransferRequest>(`${this.petsApi}/${petId}/transfer`, { newOwnerId });
  }

  acceptTransfer(id: number): Observable<OwnerTransferRequest> {
    return this.http.post<OwnerTransferRequest>(`${this.transfersApi}/${id}/accept`, {});
  }

  rejectTransfer(id: number): Observable<OwnerTransferRequest> {
    return this.http.post<OwnerTransferRequest>(`${this.transfersApi}/${id}/reject`, {});
  }

  cancelTransfer(id: number): Observable<OwnerTransferRequest> {
    return this.http.post<OwnerTransferRequest>(`${this.transfersApi}/${id}/cancel`, {});
  }
}