import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MicrochipsService } from '../../../services/microchips.service';
import { Microchip } from '../../../models/microchip.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-microchip-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './microchip-list.component.html',
  styleUrl: './microchip-list.component.scss'
})
export class MicrochipList {
  private microchipsService = inject(MicrochipsService);

  microchips: Microchip[] = [];
  chipNumber = '';
  importer = '';
  error = '';
  loading = false;

  search(): void {
    const hasChipNumber = !!this.chipNumber.trim();
    const hasImporter = !!this.importer.trim();

    if ((hasChipNumber && hasImporter) || (!hasChipNumber && !hasImporter)) {
      this.error = 'Sisesta ainult üks filter: mikrokiibi number või importija';
      this.microchips = [];
      return;
    }

    this.loading = true;
    this.error = '';

    this.microchipsService.getMicrochips({
      chipNumber: hasChipNumber ? this.chipNumber.trim() : undefined,
      importer: hasImporter ? this.importer.trim() : undefined
    }).subscribe({
      next: (res) => {
        this.microchips = this.microchipsService.normalizeListResponse<Microchip>(res);
        this.loading = false;
      },
      error: () => {
        this.error = 'Mikrokiibi laadimine ebaõnnestus';
        this.loading = false;
      }
    });
  }

  updateStatus(chip: Microchip, status: string): void {
    this.loading = true;
    this.error = '';
    this.microchipsService.updateStatus(chip.id, status).subscribe({
      next: () => {
        this.search();
    },
      error: () => {
        this.error = 'Staatuse uuendamine ebaõnnestus';
        this.loading = false;
      }
    });
  }

  remove(id: number): void {
    this.loading = true;
    this.error = '';
    this.microchipsService.deleteMicrochip(id).subscribe({
      next: () => {
        this.search();
      },
      error: () => {
        this.error = 'Kustutamine ebaõnnestus';
        this.loading = false;
      }
    });
  }
}
