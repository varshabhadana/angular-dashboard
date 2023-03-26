import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kpi2DataComponent } from './kpi2-data.component';

describe('Kpi2DataComponent', () => {
  let component: Kpi2DataComponent;
  let fixture: ComponentFixture<Kpi2DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Kpi2DataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kpi2DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
