import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { MicrochipsService } from './microchips.service';

describe('MicrochipsService', () => {
    let service: MicrochipsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MicrochipsService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(MicrochipsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should send chipNumber and importer query params', () => {
        service.getMicrochips({ chipNumber: '123456', importer: 'Vet Inc' }).subscribe();

        const req = httpMock.expectOne((request) =>
            request.url === 'http://localhost:8080/api/microchips'
        );

        expect(req.request.method).toBe('GET');
        expect(req.request.params.get('chipNumber')).toBe('123456');
        expect(req.request.params.get('importer')).toBe('Vet Inc');

        req.flush({
            microchips: [],
            page: 0,
            size: 10,
            totalPages: 0,
            totalElements: 0,
            sortBy: 'id',
            direction: 'asc'
        });
    });

    it('should map microchips response to ListResponse items', () => {
        let result: any;

        service.getMicrochips({}).subscribe((response) => {
            result = response;
        });

        const req = httpMock.expectOne((request) =>
            request.url === 'http://localhost:8080/api/microchips'
        );

        req.flush({
            microchips: [
                {
                    id: 1,
                    chipNumber: '123456',
                    importer: 'Vet Inc',
                    status: 'FREE',
                    createdAt: '2026-03-22'
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
        expect(result.items[0].chipNumber).toBe('123456');
        expect(result.totalElements).toBe(1);
    });

    it('should fetch single microchip by id', () => {
        service.getMicrochip(1).subscribe();

        const req = httpMock.expectOne('http://localhost:8080/api/microchips/1');
        expect(req.request.method).toBe('GET');

        req.flush({
            id: 1,
            chipNumber: '123456',
            status: 'FREE'
        });
    });

    it('should update microchip status', () => {
        service.updateStatus(1, 'USED').subscribe();

        const req = httpMock.expectOne('http://localhost:8080/api/microchips/1/status');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual({ status: 'USED' });

        req.flush({
            id: 1,
            chipNumber: '123456',
            status: 'USED'
        });
    });
});