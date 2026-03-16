import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MicrochipList } from './microchip-list.component';

describe('MicrochipList', () => {
  let component: MicrochipList;
  let fixture: ComponentFixture<MicrochipList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicrochipList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MicrochipList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
