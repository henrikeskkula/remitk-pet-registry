import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MicrochipsService } from '../../../services/microchips.service';

@Component({
  selector: 'app-microchip-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './microchip-form.component.html'
})
export class MicrochipForm {
  private microchipsService = inject(MicrochipsService);
  private router = inject(Router);

  model = {
    chipNumber: '',
    importer: ''
  };

  error = '';

  save(): void {
    if (!this.model.chipNumber || !this.model.importer) {
      this.error = 'Täida kõik väljad';
      return;
    }

    this.microchipsService.createMicrochip(this.model).subscribe({
      next: () => this.router.navigate(['/microchips']),
      error: () => this.error = 'Microchipi salvestamine ebaõnnestus'
    });
  }
}