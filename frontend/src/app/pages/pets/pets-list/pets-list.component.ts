import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetsService } from '../../../services/pets.service';
import { getPetSpeciesLabel, getPetStatusLabel, Pet } from '../../../models/pet.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetsListComponent {
  private petsService = inject(PetsService);
  private cdr = inject(ChangeDetectorRef);

  pets: Pet[] = [];
  loading = false;
  error = '';
  searchName = '';

  readonly petSpeciesLabel = getPetSpeciesLabel;
  readonly petStatusLabel = getPetStatusLabel;

  searchPets(): void {
    if (!this.searchName.trim()) {
      this.error = 'Sisesta looma nimi';
      this.pets = [];
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.error = '';

    this.petsService.getPets({ name: this.searchName.trim() })
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (data) => {
          this.pets = this.petsService.normalizeListResponse<Pet>(data);
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Looma otsing ebaõnnestus';
          this.pets = [];
          this.cdr.markForCheck();
        }
      });
  }
}