import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent {
  private petsService = inject(PetsService);
  private router = inject(Router);

  pet: Partial<Pet> = {
    microchipId: undefined,
    name: '',
    species: 'DOG',
    sex: 'UNKNOWN',
    status: 'ACTIVE'
  };

  submit(): void {
    this.petsService.createPet(this.pet).subscribe({
      next: () => this.router.navigate(['/pets']),
      error: () => alert('Failed to create pet')
    });
  }
}