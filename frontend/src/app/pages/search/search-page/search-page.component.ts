import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPage {
  private petsService = inject(PetsService);
  private cdr = inject(ChangeDetectorRef);

  searchText = '';
  pets: Pet[] = [];
  loading = false;
  error = '';

  search(): void {
    if (!this.searchText.trim()) {
      this.error = 'Sisesta looma nimi või mikrokiibi number';
      this.pets = [];
      return;
    }

    this.loading = true;
    this.error = '';

    const query = this.searchText.trim();
    const isNumber = /^\d+$/.test(query);
    const filters = isNumber
      ? { microchipId: Number(query) }
      : { name: query };

    this.petsService.getPets(filters)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (data) => {
          this.pets = this.petsService.normalizeListResponse<Pet>(data);
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.error = 'Otsing ebaõnnestus';
          this.pets = [];
          this.cdr.markForCheck();
        }
      });
  }
}