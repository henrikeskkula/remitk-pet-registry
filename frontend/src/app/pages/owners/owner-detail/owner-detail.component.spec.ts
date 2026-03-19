import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { OwnerDetail } from './owner-detail.component';

describe('OwnerDetail', () => {
  let component: OwnerDetail;
  let fixture: ComponentFixture<OwnerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
