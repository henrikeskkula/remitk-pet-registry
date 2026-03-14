import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsListComponent } from './pets-list.component';

describe('PetList', () => {
  let component: PetsListComponent;
  let fixture: ComponentFixture<PetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PetsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
