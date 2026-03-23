import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { PetFormComponent } from './pet-form.component';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';

describe('PetFormComponent', () => {
  let component: PetFormComponent;
  let fixture: ComponentFixture<PetFormComponent>;
  let createPetSpy: ReturnType<typeof vi.fn>;
  let navigateSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    createPetSpy = vi.fn().mockReturnValue(
      of({
        id: 1,
        microchipId: 123,
        ownerId: 5,
        species: 'DOG',
        name: 'Muri',
        sex: 'MALE',
        birthDate: '2024-01-01',
        breed: 'Mixed',
        color: 'Brown',
        imageUrl: '',
        status: 'ACTIVE',
        createdAt: '2026-03-16T00:00:00Z',
        updatedAt: '2026-03-16T00:00:00Z'
      } satisfies Pet)
    );
    navigateSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [PetFormComponent],
      providers: [
        {
          provide: PetsService,
          useValue: {
            createPet: createPetSpy
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: navigateSpy
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert birthDateValue to ISO date before submit', () => {
    component.birthDateValue = new Date(2024, 0, 5);
    component.pet = {
      microchipId: 123,
      species: 'DOG',
      sex: 'MALE',
      status: 'ACTIVE'
    };

    component.submit();

    expect(createPetSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        birthDate: '2024-01-05'
      })
    );
  });

  it('should set error when createPet fails', () => {
    createPetSpy.mockReturnValueOnce(throwError(() => new Error('fail')));

    component.submit();

    expect(component.error).toBe('Looma lisamine ebaõnnestus');
  });

  it('should submit the pet and navigate to pets list', () => {
    component.pet = {
      microchipId: 123,
      ownerId: 5,
      species: 'DOG',
      name: 'Muri',
      sex: 'MALE',
      birthDate: '2024-01-01',
      breed: 'Mixed',
      color: 'Brown',
      imageUrl: '',
      status: 'ACTIVE'
    };

    component.submit();

    expect(createPetSpy).toHaveBeenCalledWith(component.pet);
    expect(navigateSpy).toHaveBeenCalledWith(['/pets']);
  });
});
