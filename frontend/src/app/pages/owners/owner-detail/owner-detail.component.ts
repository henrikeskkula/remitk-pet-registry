import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwnersService } from '../../../services/owners.service';
import { Owner } from '../../../models/owner.model';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-owner-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './owner-detail.component.html',
  styleUrl: './owner-detail.component.scss'
})
export class OwnerDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ownersService = inject(OwnersService);

  owner?: Owner;
  originalOwner?: Owner;
  pets: Pet[] = [];
  error = '';
  loading = false;
  editMode = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.loadOwner(id);
    this.loadPets(id);
  }

  loadOwner(id: number): void {
    this.loading = true;
    this.error = '';    
    this.ownersService.getOwner(id).subscribe({
      next: (owner) => {
        this.owner = owner,
        this.originalOwner = { ...owner };
        this.loading = false;        
      },
      error: () => {
        this.error = 'Loomapidaja laadimine ebaõnnestus'
        this.loading = false;
      }
    });
  }

  loadPets(id: number): void {
    this.ownersService.getOwnerPets(id).subscribe({
      next: (res) => this.pets = this.ownersService.normalizeListResponse<Pet>(res),
      error: () => {this.error = 'Loomapidaja loomade laadimine ebaõnnestus';}
    });
  }

  save(): void {
    if (!this.owner) return;

    this.loading = true;
    this.error = '';

    this.ownersService.updateOwner(this.owner.id, this.owner).subscribe({
      next: (updated) => {
        this.owner = updated;
        this.originalOwner = { ...updated };        
        this.editMode = false;
        this.loading = false;        
      },
      error: () => {
        this.error = 'Loomapidaja uuendamine ebaõnnestus'
        this.loading = false;
      }
    });
  }

  cancelEdit(): void {
    if (this.originalOwner) {
      this.owner = { ...this.originalOwner };
    }
    this.editMode = false;
  }

  remove(): void {
    if (!this.owner) return;

    this.loading = true;
    this.error = '';    

    this.ownersService.deleteOwner(this.owner.id).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/owners']);
      },
      error: () => {
        this.error = 'Loomapidaja kustutamine ebaõnnestus'
        this.loading = false;
      }
    });
  }
}
