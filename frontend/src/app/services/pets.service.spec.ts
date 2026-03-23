import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { PetsService } from './pets.service';

describe('PetsService', () => {
  let service: PetsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PetsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send microchipId query param', () => {
    service.getPets({ microchipId: 123 }).subscribe();

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:8080/api/pets'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('microchipId')).toBe('123');

    req.flush({
      pets: [],
      page: 0,
      size: 10,
      totalPages: 0,
      totalElements: 0,
      sortBy: 'id',
      direction: 'asc'
    });
  });

  it('should map pets response to ListResponse items', () => {
    let result: any;

    service.getPets({ name: 'Muri' }).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:8080/api/pets'
    );

    req.flush({
      pets: [{ id: 1, microchipId: 123, species: 'DOG', sex: 'MALE', status: 'ACTIVE', createdAt: 'x', updatedAt: 'x' }],
      page: 0,
      size: 10,
      totalPages: 1,
      totalElements: 1,
      sortBy: 'id',
      direction: 'asc'
    });

    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe(1);
    expect(result.totalElements).toBe(1);
  });
});