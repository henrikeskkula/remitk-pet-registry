import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PetList } from './pages/pets/pet-list/pet-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
