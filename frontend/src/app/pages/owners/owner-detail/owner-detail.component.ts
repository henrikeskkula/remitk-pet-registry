import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwnersService } from '../../../services/owners.service';
import { Owner } from '../../../models/owner.model';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-owner-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './owner-detail.component.html'
})
export class OwnerDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ownersService = inject(OwnersService);

  owner?: Owner;
  pets: Pet[] = [];
  error = '';
  editMode = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.loadOwner(id);
    this.loadPets(id);
  }

  loadOwner(id: number): void {
    this.ownersService.getOwner(id).subscribe({
      next: (owner) => this.owner = owner,
      error: () => this.error = 'Owneri laadimine ebaõnnestus'
    });
  }

  loadPets(id: number): void {
    this.ownersService.getOwnerPets(id).subscribe({
      next: (res) => this.pets = this.ownersService.normalizeListResponse<Pet>(res),
      error: () => {}
    });
  }

  save(): void {
    if (!this.owner) return;

    this.ownersService.updateOwner(this.owner.id, this.owner).subscribe({
      next: (updated) => {
        this.owner = updated;
        this.editMode = false;
      },
      error: () => this.error = 'Owneri uuendamine ebaõnnestus'
    });
  }

  remove(): void {
    if (!this.owner) return;

    this.ownersService.deleteOwner(this.owner.id).subscribe({
      next: () => this.router.navigate(['/owners']),
      error: () => this.error = 'Owneri kustutamine ebaõnnestus'
    });
  }
}