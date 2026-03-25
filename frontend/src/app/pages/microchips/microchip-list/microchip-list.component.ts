import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MicrochipsService } from '../../../services/microchips.service';
import { getMicrochipStatusLabel, Microchip } from '../../../models/microchip.model';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-microchip-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './microchip-list.component.html',
  styleUrl: './microchip-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MicrochipList {
  private microchipsService = inject(MicrochipsService);
  private cdr = inject(ChangeDetectorRef);

  microchips: Microchip[] = [];
  chipNumber = '';
  importer = '';
  error = '';
  loading = false;

  readonly microchipStatusLabel = getMicrochipStatusLabel;

  search(): void {
    const hasChipNumber = !!this.chipNumber.trim();
    const hasImporter = !!this.importer.trim();

    if ((hasChipNumber && hasImporter) || (!hasChipNumber && !hasImporter)) {
      this.error = 'Sisesta ainult üks filter: mikrokiibi number või importija';
      this.microchips = [];
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.error = '';

    this.microchipsService.getMicrochips({
      chipNumber: hasChipNumber ? this.chipNumber.trim() : undefined,
      importer: hasImporter ? this.importer.trim() : undefined
    })
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (res) => {
          this.microchips = this.microchipsService.normalizeListResponse<Microchip>(res);
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Mikrokiibi otsing ebaõnnestus';
          this.microchips = [];
          this.cdr.markForCheck();
        }
      });
  }

  updateStatus(chip: Microchip, status: string): void {
    this.loading = true;
    this.error = '';
    this.microchipsService.updateStatus(chip.id, status)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: () => {
          this.search();
        },
        error: () => {
          this.error = 'Staatuse uuendamine ebaõnnestus';
          this.cdr.markForCheck();
        }
      });
  }

  remove(id: number): void {
    this.loading = true;
    this.error = '';
    this.microchipsService.deleteMicrochip(id)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: () => {
          this.search();
        },
        error: () => {
          this.error = 'Kustutamine ebaõnnestus';
          this.cdr.markForCheck();
        }
      });
  }
}