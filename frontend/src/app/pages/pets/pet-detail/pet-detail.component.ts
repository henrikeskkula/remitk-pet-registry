import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';

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
  private cdr = inject(ChangeDetectorRef);

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
      this.error = 'Vigane looma ID.';
      this.cdr.markForCheck();
      return;
    }

    this.loadPet(id);
  }

  loadPet(id: number): void {
    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.petsService.getPetById(id)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (data) => {
          this.pet = data;
          this.originalPet = { ...data };
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Looma laadimine ebaõnnestus.';
          this.cdr.markForCheck();
        }
      });
  }

  save(): void {
    if (!this.pet) return;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.petsService.updatePet(this.pet.id, this.pet)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (updated) => {
          this.pet = updated;
          this.originalPet = { ...updated };
          this.editMode = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Looma värskendamine ebaõnnestus.';
          this.cdr.markForCheck();
        }
      });
  }

  cancelEdit(): void {
    if (!this.originalPet) {
      this.editMode = false;
      this.cdr.markForCheck();
      return;
    }

    this.pet = { ...this.originalPet };
    this.editMode = false;
    this.cdr.markForCheck();
  }

  remove(): void {
    if (!this.pet) return;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.petsService.deletePet(this.pet.id)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: () => {
          this.router.navigate(['/pets']);
        },
        error: () => {
          this.error = 'Looma kustutamine ebaõnnestus.';
          this.cdr.markForCheck();
        }
      });
  }

  createTransfer(): void {
    if (!this.pet || this.newOwnerId === undefined || this.newOwnerId === null) {
      this.error = 'Uue omaniku ID on nõutav.';
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.transferRequestsService.createTransfer(this.pet.id, this.newOwnerId)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (transfer) => {
          this.lastTransfer = transfer;
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Üleanmise loomine ebaõnnestus.';
          this.cdr.markForCheck();
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
      this.error = 'Üleandmine pole valitud.';
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    const request$ = action === 'accept'
      ? this.transferRequestsService.acceptTransfer(this.lastTransfer.id)
      : action === 'reject'
        ? this.transferRequestsService.rejectTransfer(this.lastTransfer.id)
        : this.transferRequestsService.cancelTransfer(this.lastTransfer.id);

    request$
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: () => {
          this.lastTransfer = undefined;
          this.cdr.markForCheck();

          if (action === 'accept' && this.pet) {
            this.loadPet(this.pet.id);
          }
        },
        error: () => {
          this.error = `Üleandmise ${action === 'accept' ? 'kinnitus' : action === 'reject' ? 'tagasilükkamine' : 'tühistamine'} ebaõnnestus.`;
          this.cdr.markForCheck();
        }
      });
  }
}