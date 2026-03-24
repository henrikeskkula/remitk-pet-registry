import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetEventsService } from '../../../services/pet-events.service';
import { getPetEventTypeLabel, PetEvent, PetEventType } from '../../../models/pet-event.model';

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

  readonly eventTypeOptions: PetEventType[] = [
    'MARKED_MISSING',
    'MARKED_FOUND',
    'TRANSFER_INITIATED',
    'TRANSFER_ACCEPTED',
    'TRANSFER_REJECTED'
  ];
  readonly petEventTypeLabel = getPetEventTypeLabel;

  model = {
    type: 'MARKED_MISSING' as PetEventType,
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
      error: () => this.error = 'Sündmuste laadimine ebaõnnestus'
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
      error: () => this.error = 'Sündmuse loomine ebaõnnestus'
    });
  }
}
