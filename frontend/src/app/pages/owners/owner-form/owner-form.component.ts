import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnersService } from '../../../services/owners.service';

@Component({
  selector: 'app-owner-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './owner-form.component.html',
  styleUrl: './owner-form.component.scss'
})
export class OwnerForm {
  private ownersService = inject(OwnersService);
  private router = inject(Router);

  model = {
    personalCode: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: ''
  };

  error = '';

  save(): void {
    this.error = '';

    if (!this.model.personalCode || !this.model.firstName || !this.model.lastName) {
      this.error = 'Täida kohustuslikud väljad';
      return;
    }

    this.ownersService.createOwner(this.model).subscribe({
      next: (owner) => this.router.navigate(['/owners', owner.id]),
      error: () => this.error = 'Owneri salvestamine ebaõnnestus'
    });
  }
}
