import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pets', pathMatch: 'full' },

  {
    path: 'pets',
    loadComponent: () =>
      import('./pages/pets/pets-list/pets-list.component').then(m => m.PetsListComponent)
  },
  {
    path: 'pets/new',
    loadComponent: () =>
      import('./pages/pets/pet-form/pet-form.component').then(m => m.PetFormComponent)
  },
  {
    path: 'pets/:id',
    loadComponent: () =>
      import('./pages/pets/pet-detail/pet-detail.component').then(m => m.PetDetailComponent)
  },
  {
    path: 'pets/:id/events',
    loadComponent: () =>
      import('./pages/pets/pet-events/pet-events.component').then(m => m.PetEventsComponent)
  },

  {
    path: 'owners',
    loadComponent: () =>
      import('./pages/owners/owner-list/owner-list.component').then(m => m.OwnerList)
  },
  {
    path: 'owners/new',
    loadComponent: () =>
      import('./pages/owners/owner-form/owner-form.component').then(m => m.OwnerForm)
  },
  {
    path: 'owners/:id',
    loadComponent: () =>
      import('./pages/owners/owner-detail/owner-detail.component').then(m => m.OwnerDetail)
  },

  {
    path: 'microchips',
    loadComponent: () =>
      import('./pages/microchips/microchip-list/microchip-list.component').then(m => m.MicrochipList)
  },
  {
    path: 'microchips/new',
    loadComponent: () =>
      import('./pages/microchips/microchip-form/microchip-form.component').then(m => m.MicrochipForm)
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search-page/search-page.component').then(m => m.SearchPage)
  },

  { path: '**', redirectTo: 'pets' }
];
