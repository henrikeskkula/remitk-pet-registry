import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { OwnerTransferRequestsService } from './owner-transfer-requests.service';

describe('OwnerTransferRequestsService', () => {
  let service: OwnerTransferRequestsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OwnerTransferRequestsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(OwnerTransferRequestsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create transfer with petId and newOwnerId', () => {
    service.createTransfer(5, 10).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/pets/5/transfer');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ newOwnerId: 10 });

    req.flush({
      id: 1,
      petId: 5,
      oldOwnerId: 1,
      newOwnerId: 10,
      status: 'PENDING',
      createdAt: '2026-03-22T10:00:00Z'
    });
  });

  it('should accept transfer', () => {
    service.acceptTransfer(1).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/transfers/1/accept');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});

    req.flush(null);
  });

  it('should reject transfer', () => {
    service.rejectTransfer(1).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/transfers/1/reject');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});

    req.flush(null);
  });

  it('should cancel transfer', () => {
    service.cancelTransfer(1).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/transfers/1/cancel');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});

    req.flush(null);
  });
});