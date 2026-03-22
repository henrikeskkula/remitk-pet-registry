import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { SearchPage } from './search-page.component';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
  let getPetsSpy: ReturnType<typeof vi.fn>;
  let normalizeSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getPetsSpy = vi.fn().mockReturnValue(of({
      items: [],
      page: 0,
      size: 0,
      totalPages: 0,
      totalElements: 0,
      sortBy: 'id',
      direction: 'asc'
    }));
    normalizeSpy = vi.fn().mockReturnValue([]);

    await TestBed.configureTestingModule({
      imports: [SearchPage],
      providers: [
        {
          provide: PetsService,
          useValue: {
            getPets: getPetsSpy,
            normalizeListResponse: normalizeSpy
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use microchipId filter for numeric input', () => {
    component.searchText = '12345';

    component.search();

    expect(getPetsSpy).toHaveBeenCalledWith({ microchipId: 12345 });
  });

  it('should use name filter for text input', () => {
    component.searchText = 'Muri';

    component.search();

    expect(getPetsSpy).toHaveBeenCalledWith({ name: 'Muri' });
  });
});