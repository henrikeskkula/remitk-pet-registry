import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PetEventsComponent } from './pet-events.component';

describe('PetEvents', () => {
  let component: PetEventsComponent;
  let fixture: ComponentFixture<PetEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetEventsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PetEventsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
