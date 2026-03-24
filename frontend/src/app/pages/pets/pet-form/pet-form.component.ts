import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PetsService } from '../../../services/pets.service';
import {
  Pet,
  PetSpecies,
  PetSex,
  PetStatus,
  getPetSpeciesLabel,
  getPetSexLabel,
  getPetStatusLabel
} from '../../../models/pet.model';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent {
  private petsService = inject(PetsService);
  private router = inject(Router);

  readonly speciesOptions: PetSpecies[] = ['DOG', 'CAT', 'FERRET'];
  readonly sexOptions: PetSex[] = ['MALE', 'FEMALE', 'UNKNOWN'];
  readonly statusOptions: PetStatus[] = ['ACTIVE', 'MISSING', 'DECEASED', 'ABROAD'];
  readonly petSpeciesLabel = getPetSpeciesLabel;
  readonly petSexLabel = getPetSexLabel;
  readonly petStatusLabel = getPetStatusLabel;

  error = '';
  birthDateValue: Date | null = null;

  pet: Partial<Pet> = {
    microchipId: undefined,
    ownerId: undefined,
    name: '',
    species: 'DOG',
    sex: 'UNKNOWN',
    birthDate: '',
    breed: '',
    color: '',
    imageUrl: '',
    status: 'ACTIVE'
  };

  private toIsoDate(date: Date | null): string {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  submit(): void {
    this.error = '';

    if (this.birthDateValue) {
      this.pet.birthDate = this.toIsoDate(this.birthDateValue);
    }

    this.petsService.createPet(this.pet).subscribe({
      next: () => this.router.navigate(['/pets']),
      error: () => {
        this.error = 'Looma lisamine ebaõnnestus';
      }
    });
  }
}
