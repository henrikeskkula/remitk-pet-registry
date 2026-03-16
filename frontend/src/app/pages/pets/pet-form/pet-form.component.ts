import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent {
  private petsService = inject(PetsService);
  private router = inject(Router);

  error = '';
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

  submit(): void {
    this.error = '';

    this.petsService.createPet(this.pet).subscribe({
      next: () => this.router.navigate(['/pets']),
      error: () => {
        this.error = 'Failed to create pet';
      }
    });
  }
}
