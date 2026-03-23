import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PetsService } from '../../../services/pets.service';
import { OwnerTransferRequestsService } from '../../../services/owner-transfer-requests.service';
import { Pet, PetSex, PetSpecies, PetStatus } from '../../../models/pet.model';
import { OwnerTransferRequest } from '../../../models/owner-transfer-request.model';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pet-detail.component.html'
})
export class PetDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private petsService = inject(PetsService);
  private transferRequestsService = inject(OwnerTransferRequestsService);

  pet?: Pet;
  originalPet?: Pet;
  error = '';
  loading = false;
  editMode = false;
  newOwnerId?: number;
  lastTransfer?: OwnerTransferRequest;

  speciesOptions: PetSpecies[] = ['DOG', 'CAT', 'FERRET'];
  sexOptions: PetSex[] = ['MALE', 'FEMALE', 'UNKNOWN'];
  statusOptions: PetStatus[] = ['ACTIVE', 'MISSING', 'DECEASED', 'ABROAD'];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Invalid pet id.';
      return;
    }

    this.loadPet(id);
  }

  loadPet(id: number): void {
    this.loading = true;
    this.error = '';

    this.petsService.getPetById(id).subscribe({
      next: (data) => {
        this.pet = data;
        this.originalPet = { ...data };
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load pet.';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (!this.pet) return;
    
    this. loading = true;
    this.error = '';

    this.petsService.updatePet(this.pet.id, this.pet).subscribe({
      next: (updated) => {
        this.pet = updated;
        this.originalPet = { ...updated };
        this.editMode = false;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to update pet.';
        this.loading = false;
      }
    });
  }

  cancelEdit(): void {
    if (!this.originalPet) {
      this.editMode = false;
      return;
    }

    this.pet = { ...this.originalPet };
    this.editMode = false;
  }

  remove(): void {
    if (!this.pet) return;

    this.loading = true;
    this.error = '';

    this.petsService.deletePet(this.pet.id).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/pets']);
      },
      error: () => {
        this.error = 'Failed to delete pet.';
        this.loading = false;
      }
    });
  }

  createTransfer(): void {
    if (!this.pet || this.newOwnerId === undefined || this.newOwnerId === null) {
      this.error = 'New owner ID is required.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.transferRequestsService.createTransfer(this.pet.id, this.newOwnerId).subscribe({
      next: (transfer) => {
        this.lastTransfer = transfer;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to create transfer.';
        this.loading = false;
      }
    });
  }

  acceptTransfer(): void {
    this.updateTransfer('accept');
  }

  rejectTransfer(): void {
    this.updateTransfer('reject');
  }

  cancelTransfer(): void {
    this.updateTransfer('cancel');
  }

  private updateTransfer(action: 'accept' | 'reject' | 'cancel'): void {
    if (!this.lastTransfer) {
      this.error = 'No transfer selected.';
      return;
    }

    this.loading = true;
    this.error = '';

    const request$ = action === 'accept'
      ? this.transferRequestsService.acceptTransfer(this.lastTransfer.id)
      : action === 'reject'
        ? this.transferRequestsService.rejectTransfer(this.lastTransfer.id)
        : this.transferRequestsService.cancelTransfer(this.lastTransfer.id);

    request$.subscribe({
      next: () => {
        this.lastTransfer = undefined;
        this.loading = false;
        if (action === 'accept' && this.pet) {
          this.loadPet(this.pet.id);
        }
      },
      error: () => {
        this.error = `Failed to ${action} transfer.`;
        this.loading = false;
      }
    });
  }
}
