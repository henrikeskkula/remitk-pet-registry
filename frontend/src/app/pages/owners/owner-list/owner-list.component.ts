import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwnersService } from '../../../services/owners.service';
import { Owner } from '../../../models/owner.model';

@Component({
  selector: 'app-owner-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './owner-list.component.html',
  styleUrl: './owner-list.component.scss'
})
export class OwnerList {
  private ownersService = inject(OwnersService);

  owners: Owner[] = [];
  searchName = '';
  error = '';
  loading = false;

  searchOwners(): void {
    if (!this.searchName.trim()) {
      this.error = 'Sisesta nimi';
      this.owners = [];
      return;
    }

    this.loading = true;
    this.error = '';

    this.ownersService.getOwners({ name: this.searchName.trim() }).subscribe({
      next: (data) => {
        this.owners = this.ownersService.normalizeListResponse<Owner>(data);
        this.loading = false;
      },
      error: () => {
        this.error = 'Ownerite laadimine ebaõnnestus';
        this.loading = false;
      }
    });
  }
}
