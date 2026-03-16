import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPage {

  private petsService = inject(PetsService);

  searchText = '';
  pets: Pet[] = [];
  loading = false;
  error = '';

  search(): void {

    if (!this.searchText.trim()) {
      this.error = 'Enter pet name';
      return;
    }

    this.loading = true;
    this.error = '';

    this.petsService.getPets({ name: this.searchText.trim() }).subscribe({
      next: (data) => {
        this.pets = this.petsService.normalizeListResponse<Pet>(data);
        this.loading = false;
      },
      error: () => {
        this.error = 'Search failed';
        this.loading = false;
      }
    });

  }

}
