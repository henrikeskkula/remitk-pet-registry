import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { OwnerList } from './owner-list.component';

describe('OwnerList', () => {
  let component: OwnerList;
  let fixture: ComponentFixture<OwnerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
