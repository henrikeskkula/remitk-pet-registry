import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-events.component.html',
  styleUrls: ['./pet-events.component.scss']
})
export class PetEventsComponent {
  events: any[] = [];
}