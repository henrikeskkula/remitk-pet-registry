import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pets-list.component.html'
})
export class PetsListComponent implements OnInit {

  private petsService = inject(PetsService);

  pets: Pet[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.loading = true;

    this.petsService.getPets().subscribe({
      next: (data) => {
        this.pets = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Pets loading failed';
        this.loading = false;
      }
    });
  }

}