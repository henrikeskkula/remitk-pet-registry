import { Routes } from '@angular/router';
import { PetsListComponent } from './pages/pets/pets-list/pets-list.component';
import { PetFormComponent } from './pages/pets/pet-form/pet-form.component';
import { PetDetailComponent } from './pages/pets/pet-detail/pet-detail.component';
import { PetEventsComponent } from './pages/pets/pet-events/pet-events.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pets', pathMatch: 'full' },
  { path: 'pets', component: PetsListComponent },
  { path: 'pets/new', component: PetFormComponent },
  { path: 'pets/:id', component: PetDetailComponent },
  { path: 'pets/:id/events', component: PetEventsComponent }
];