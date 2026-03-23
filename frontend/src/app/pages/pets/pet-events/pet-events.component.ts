import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetEventsService } from '../../../services/pet-events.service';
import { PetEvent } from '../../../models/pet-event.model';

@Component({
  selector: 'app-pet-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-events.component.html'
})
export class PetEventsComponent {
  private route = inject(ActivatedRoute);
  private petEventsService = inject(PetEventsService);

  petId = 0;
  events: PetEvent[] = [];
  error = '';

  model = {
    type: 'MARKED_MISSING',
    description: '',
    time: ''
  };

  ngOnInit(): void {
    this.petId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.petId) {
      this.loadEvents();
    }
  }

  loadEvents(): void {
    this.petEventsService.getEventsByPetId(this.petId).subscribe({
      next: (res) => this.events = this.petEventsService.normalizeListResponse<PetEvent>(res),
      error: () => this.error = 'Eventide laadimine ebaõnnestus'
    });
  }

  createEvent(): void {
    this.petEventsService.createEvent({
      petId: this.petId,
      type: this.model.type,
      description: this.model.description || undefined,
      time: this.model.time || undefined
    }).subscribe({
      next: () => {
        this.model.description = '';
        this.model.time = '';
        this.loadEvents();
      },
      error: () => this.error = 'Eventi loomine ebaõnnestus'
    });
  }
}
