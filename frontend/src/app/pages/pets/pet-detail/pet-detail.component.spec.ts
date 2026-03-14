import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailComponent } from './pet-detail.component';

describe('PetDetail', () => {
  let component: PetDetailComponent;
  let fixture: ComponentFixture<PetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PetDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
