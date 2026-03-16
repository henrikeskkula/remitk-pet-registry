import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetsService } from '../../../services/pets.service';
import { PetEventsService } from '../../../services/pet-events.service';
import { Pet } from '../../../models/pet.model';
import { PetEvent } from '../../../models/pet-event.model';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pet-detail.component.html'
})
export class PetDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private petsService = inject(PetsService);
  private petEventsService = inject(PetEventsService);

  pet?: Pet;
  events: PetEvent[] = [];
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.petsService.getPetById(id).subscribe({
      next: (data) => (this.pet = data),
      error: () => (this.error = 'Failed to load pet.')
    });

    this.petEventsService.getEventsByPetId(id).subscribe({
      next: (data) => (this.events = data),
      error: () => {}
    });
  }
}