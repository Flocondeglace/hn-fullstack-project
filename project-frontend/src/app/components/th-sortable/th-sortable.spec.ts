import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThSortable } from './th-sortable';

describe('ThSortable', () => {
  let component: ThSortable;
  let fixture: ComponentFixture<ThSortable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThSortable],
    }).compileComponents();

    fixture = TestBed.createComponent(ThSortable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
