import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from '../../../services/pets.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.scss'
})
export class PetDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private petsService = inject(PetsService);

  pet?: Pet;

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.petsService.getPetById(id).subscribe({
      next: (data) => this.pet = data
    });

  }

}