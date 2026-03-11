import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrochipForm } from './microchip-form';

describe('MicrochipForm', () => {
  let component: MicrochipForm;
  let fixture: ComponentFixture<MicrochipForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicrochipForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MicrochipForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
