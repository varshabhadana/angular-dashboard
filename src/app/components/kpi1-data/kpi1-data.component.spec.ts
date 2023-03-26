import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kpi1DataComponent } from './kpi1-data.component';

describe('Kpi1DataComponent', () => {
  let component: Kpi1DataComponent;
  let fixture: ComponentFixture<Kpi1DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Kpi1DataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kpi1DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
