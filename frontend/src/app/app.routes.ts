import { Routes } from '@angular/router';
import { PetFormComponent } from './pages/pets/pet-form/pet-form.component';
import { PetDetailComponent } from './pages/pets/pet-detail/pet-detail.component';
import { PetEventsComponent } from './pages/pets/pet-events/pet-events.component';
import { OwnerList } from './pages/owners/owner-list/owner-list.component';
import { OwnerForm } from './pages/owners/owner-form/owner-form.component';
import { OwnerDetail } from './pages/owners/owner-detail/owner-detail.component';
import { SearchPage } from './pages/search/search-page/search-page.component';
import { PetsListComponent } from './pages/pets/pets-list/pets-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pets', pathMatch: 'full' },
  { path: 'pets', component: PetsListComponent },
  { path: 'pets/new', component: PetFormComponent },
  { path: 'pets/:id', component: PetDetailComponent },
  { path: 'pets/:id/events', component: PetEventsComponent },
  { path: 'owners', component: OwnerList },
  { path: 'owners/new', component: OwnerForm },
  { path: 'owners/:id', component: OwnerDetail },
  { path: 'search', component: SearchPage }
];