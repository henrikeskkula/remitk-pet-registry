import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { PetEventsService } from './pet-events.service';

describe('PetEventsService', () => {
  let service: PetEventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetEventsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PetEventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send petId query param', () => {
    service.getEventsByPetId(5).subscribe();

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:8080/api/events'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('petId')).toBe('5');

    req.flush({
      petEvents: [],
      page: 0,
      size: 10,
      totalPages: 0,
      totalElements: 0,
      sortBy: 'id',
      direction: 'asc'
    });
  });

  it('should map petEvents response to ListResponse items', () => {
    let result: any;

    service.getEventsByPetId(5).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:8080/api/events'
    );

    req.flush({
      petEvents: [
        {
          id: 1,
          petId: 5,
          eventType: 'REGISTERED',
          description: 'Pet registered',
          eventTimestamp: '2026-03-22T10:00:00Z',
          createdAt: '2026-03-22T10:00:00Z'
        }
      ],
      page: 0,
      size: 10,
      totalPages: 1,
      totalElements: 1,
      sortBy: 'id',
      direction: 'asc'
    });

    expect(result.items.length).toBe(1);
    expect(result.items[0].eventType).toBe('REGISTERED');
    expect(result.totalElements).toBe(1);
  });

  it('should create event with payload', () => {
    const payload = {
      petId: 5,
      eventType: 'OWNER_CHANGED',
      description: 'Owner transfer',
      eventTimestamp: '2026-03-22T11:00:00Z'
    };

    service.createEvent(payload).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/events');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush({
      id: 2,
      petId: 5,
      eventType: 'OWNER_CHANGED',
      description: 'Owner transfer',
      eventTimestamp: '2026-03-22T11:00:00Z',
      createdAt: '2026-03-22T11:00:00Z'
    });
  });
});