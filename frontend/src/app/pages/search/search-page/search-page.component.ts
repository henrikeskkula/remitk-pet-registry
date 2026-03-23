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
      this.error = 'Sisesta looma nimi või mikrokiibi number';
      return;
    }

    this.loading = true;
    this.error = '';

    const query = this.searchText.trim();
    const isNumber = /^\d+$/.test(query);
    const filters = isNumber
      ? { microchipId: Number(query) }
      : { name: query };

    this.petsService.getPets(filters).subscribe({
      next: (data) => {
        this.pets = this.petsService.normalizeListResponse<Pet>(data);
        this.loading = false;
      },
      error: () => {
        this.error = 'Otsing ebaõnnestus';
        this.loading = false;
      }
    });

  }

}
