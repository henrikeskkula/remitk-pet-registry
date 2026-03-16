import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent {
  private petsService = inject(PetsService);

  pets: Pet[] = [];
  loading = false;
  error = '';
  searchName = '';

  searchPets(): void {
    this.loading = true;
    this.error = '';

    if (!this.searchName.trim()) {
      this.error = 'Enter pet name';
      this.loading = false;
      this.pets = [];
      return;
    }

    this.petsService.getPets({ name: this.searchName.trim() }).subscribe({
      next: (data) => {
        this.pets = data as Pet[];
        this.loading = false;
      },
      error: () => {
        this.error = 'Pets loading failed';
        this.loading = false;
      }
    });
  }
}