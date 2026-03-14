import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss']
})
export class PetDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private petsService = inject(PetsService);

  pet?: Pet;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || isNaN(id)) {
      this.error = 'Invalid pet id';
      return;
    }

    this.petsService.getPetById(id).subscribe({
      next: (data) => this.pet = data,
      error: () => this.error = 'Failed to load pet'
    });
  }
}