import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { OwnersService } from './owners.service';

describe('OwnersService', () => {
  let service: OwnersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OwnersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(OwnersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send personalCode and name query params', () => {
    service.getOwners({ personalCode: '38001010000', name: 'John' }).subscribe();

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:8080/api/owners'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('personalCode')).toBe('38001010000');
    expect(req.request.params.get('name')).toBe('John');

    req.flush({
      owners: [],
      page: 0,
      size: 10,
      totalPages: 0,
      totalElements: 0,
      sortBy: 'id',
      direction: 'asc'
    });
  });

  it('should map owners response to ListResponse items', () => {
    let result: any;

    service.getOwners({}).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:8080/api/owners'
    );

    req.flush({
      owners: [
        {
          id: 1,
          personalCode: '38001010000',
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Street',
          email: 'john@example.com',
          phone: '555-1234'
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
    expect(result.items[0].id).toBe(1);
    expect(result.totalElements).toBe(1);
  });

  it('should fetch single owner by id', () => {
    service.getOwner(1).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/owners/1');
    expect(req.request.method).toBe('GET');

    req.flush({
      id: 1,
      personalCode: '38001010000',
      firstName: 'John',
      lastName: 'Doe'
    });
  });

  it('should fetch owner pets with pagination', () => {
    let result: any;

    service.getOwnerPets(1, 0, 20, 'name').subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:8080/api/owners/1/pets'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('20');
    expect(req.request.params.get('sortBy')).toBe('name');

    req.flush({
      pets: [
        {
          id: 10,
          microchipId: 123,
          ownerId: 1,
          species: 'DOG',
          name: 'Muri',
          sex: 'MALE',
          status: 'ACTIVE',
          createdAt: 'x',
          updatedAt: 'x'
        }
      ],
      page: 0,
      size: 20,
      totalPages: 1,
      totalElements: 1,
      sortBy: 'name',
      direction: 'asc'
    });

    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe('Muri');
  });
});