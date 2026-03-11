import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetEvents } from './pet-events';

describe('PetEvents', () => {
  let component: PetEvents;
  let fixture: ComponentFixture<PetEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetEvents],
    }).compileComponents();

    fixture = TestBed.createComponent(PetEvents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
