import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataComparisionComponent } from './data-comparision.component';

describe('DataComparisionComponent', () => {
  let component: DataComparisionComponent;
  let fixture: ComponentFixture<DataComparisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataComparisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
