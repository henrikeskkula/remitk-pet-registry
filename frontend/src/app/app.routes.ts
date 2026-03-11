import { Routes } from '@angular/router';
import { PetList } from './pages/pets/pet-list/pet-list';
import { PetForm } from './pages/pets/pet-form/pet-form';
import { PetDetail } from './pages/pets/pet-detail/pet-detail';
import { PetEvents } from './pages/pets/pet-events/pet-events';
import { OwnerList } from './pages/owners/owner-list/owner-list';
import { OwnerForm } from './pages/owners/owner-form/owner-form';
import { OwnerDetail } from './pages/owners/owner-detail/owner-detail';
import { SearchPage } from './pages/search/search-page/search-page';

export const routes: Routes = [
  { path: '', redirectTo: 'pets', pathMatch: 'full' },
  { path: 'pets', component: PetList },
  { path: 'pets/new', component: PetForm },
  { path: 'pets/:id', component: PetDetail },
  { path: 'pets/:id/events', component: PetEvents },
  { path: 'owners', component: OwnerList },
  { path: 'owners/new', component: OwnerForm },
  { path: 'owners/:id', component: OwnerDetail },
  { path: 'search', component: SearchPage }
];