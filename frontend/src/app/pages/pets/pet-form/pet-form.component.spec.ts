import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from '../../../services/pets.service';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet-form.component.html'
})
export class PetFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private petsService = inject(PetsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  petId?: number;
  error = '';

  form = this.fb.group({
    microchipId: ['', Validators.required],
    ownerId: [''],
    species: ['', Validators.required],
    name: [''],
    sex: ['', Validators.required],
    birthDate: [''],
    breed: [''],
    color: [''],
    imageUrl: [''],
    status: ['ACTIVE', Validators.required]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.petId = Number(id);

      this.petsService.getPetById(this.petId).subscribe({
        next: (pet) => {
          this.form.patchValue({
            microchipId: String(pet.microchipId),
            ownerId: pet.ownerId ? String(pet.ownerId) : '',
            species: pet.species,
            name: pet.name || '',
            sex: pet.sex,
            birthDate: pet.birthDate || '',
            breed: pet.breed || '',
            color: pet.color || '',
            imageUrl: pet.imageUrl || '',
            status: pet.status
          });
        }
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const payload = {
      microchipId: Number(raw.microchipId),
      ownerId: raw.ownerId ? Number(raw.ownerId) : null,
      species: raw.species!,
      name: raw.name || null,
      sex: raw.sex!,
      birthDate: raw.birthDate || null,
      breed: raw.breed || null,
      color: raw.color || null,
      imageUrl: raw.imageUrl || null,
      status: raw.status!
    };

    const request = this.petId
      ? this.petsService.updatePet(this.petId, payload)
      : this.petsService.createPet(payload);

    request.subscribe({
      next: (pet) => this.router.navigate(['/pets', pet.id]),
      error: () => (this.error = 'Saving failed.')
    });
  }
}