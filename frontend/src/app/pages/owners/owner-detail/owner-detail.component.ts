import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwnersService } from '../../../services/owners.service';
import { Owner } from '../../../models/owner.model';
import { getPetSpeciesLabel, getPetStatusLabel, Pet } from '../../../models/pet.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-owner-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './owner-detail.component.html',
  styleUrl: './owner-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnerDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ownersService = inject(OwnersService);
  private cdr = inject(ChangeDetectorRef);

  owner?: Owner;
  originalOwner?: Owner;
  pets: Pet[] = [];
  error = '';
  loading = false;
  petsLoading = false;
  editMode = false;

  readonly petSpeciesLabel = getPetSpeciesLabel;
  readonly petStatusLabel = getPetStatusLabel;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Vigane loomapidaja ID.';
      this.cdr.markForCheck();
      return;
    }

    this.loadOwner(id);
    this.loadPets(id);
  }

  loadOwner(id: number): void {
    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.ownersService.getOwner(id)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (owner) => {
          this.owner = owner;
          this.originalOwner = { ...owner };
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Loomapidaja laadimine ebaõnnestus';
          this.cdr.markForCheck();
        }
      });
  }

  loadPets(id: number): void {
    this.petsLoading = true;
    this.cdr.markForCheck();

    this.ownersService.getOwnerPets(id)
      .pipe(finalize(() => {
        this.petsLoading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (res) => {
          this.pets = this.ownersService.normalizeListResponse<Pet>(res);
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Loomapidaja loomade laadimine ebaõnnestus';
          this.cdr.markForCheck();
        }
      });
  }

  save(): void {
    if (!this.owner) return;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.ownersService.updateOwner(this.owner.id, this.owner)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (updated) => {
          this.owner = updated;
          this.originalOwner = { ...updated };
          this.editMode = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Loomapidaja uuendamine ebaõnnestus';
          this.cdr.markForCheck();
        }
      });
  }

  cancelEdit(): void {
    if (this.originalOwner) {
      this.owner = { ...this.originalOwner };
    }
    this.editMode = false;
    this.cdr.markForCheck();
  }

  remove(): void {
    if (!this.owner) return;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.ownersService.deleteOwner(this.owner.id)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: () => {
          this.router.navigate(['/owners']);
        },
        error: () => {
          this.error = 'Loomapidaja kustutamine ebaõnnestus';
          this.cdr.markForCheck();
        }
      });
  }
}
