import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kpi3DataComponent } from './kpi3-data.component';

describe('Kpi3DataComponent', () => {
  let component: Kpi3DataComponent;
  let fixture: ComponentFixture<Kpi3DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Kpi3DataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kpi3DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
