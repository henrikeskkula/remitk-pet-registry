import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwnersService } from '../../../services/owners.service';
import { Owner } from '../../../models/owner.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-owner-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './owner-list.component.html',
  styleUrl: './owner-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnerList {
  private ownersService = inject(OwnersService);
  private cdr = inject(ChangeDetectorRef);

  owners: Owner[] = [];
  searchName = '';
  error = '';
  loading = false;

  searchOwners(): void {
    if (!this.searchName.trim()) {
      this.error = 'Sisesta nimi';
      this.owners = [];
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.error = '';

    this.ownersService.getOwners({ name: this.searchName.trim() })
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (data) => {
          this.owners = this.ownersService.normalizeListResponse<Owner>(data);
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Loomapidajate laadimine ebaõnnestus';
          this.owners = [];
          this.cdr.markForCheck();
        }
      });
  }
}