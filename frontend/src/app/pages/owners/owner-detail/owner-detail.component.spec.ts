import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of, Subject } from 'rxjs';
import { vi } from 'vitest';

import { OwnerDetail } from './owner-detail.component';
import { OwnersService } from '../../../services/owners.service';
import { Owner } from '../../../models/owner.model';

describe('OwnerDetail', () => {
  let component: OwnerDetail;
  let fixture: ComponentFixture<OwnerDetail>;
  let ownersService: {
    getOwner: ReturnType<typeof vi.fn>;
    getOwnerPets: ReturnType<typeof vi.fn>;
    updateOwner: ReturnType<typeof vi.fn>;
    deleteOwner: ReturnType<typeof vi.fn>;
    normalizeListResponse: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    ownersService = {
      getOwner: vi.fn(),
      getOwnerPets: vi.fn(),
      updateOwner: vi.fn(),
      deleteOwner: vi.fn(),
      normalizeListResponse: vi.fn()
    };
    ownersService.getOwner.mockReturnValue(of({
      id: 1,
      personalCode: '38001010000',
      firstName: 'Mari',
      lastName: 'Maasikas',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z'
    } as Owner));
    ownersService.getOwnerPets.mockReturnValue(of({ items: [] } as any));
    ownersService.normalizeListResponse.mockReturnValue([]);

    await TestBed.configureTestingModule({
      imports: [OwnerDetail],
      providers: [
        provideRouter([]),
        { provide: OwnersService, useValue: ownersService as unknown as OwnersService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? '1' : null
              }
            }
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load owner details from route id', () => {
    expect(ownersService.getOwner).toHaveBeenCalledWith(1);
    expect(component.owner?.id).toBe(1);
    expect(component.loading).toBe(false);
  });

  it('should stop loading after owner request completes', () => {
    const owner$ = new Subject<Owner>();
    ownersService.getOwner.mockReturnValue(owner$);

    component.loadOwner(1);
    expect(component.loading).toBe(true);

    owner$.next({
      id: 1,
      personalCode: '38001010000',
      firstName: 'Mari',
      lastName: 'Maasikas',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z'
    });
    owner$.complete();

    expect(component.loading).toBe(false);
  });
});
