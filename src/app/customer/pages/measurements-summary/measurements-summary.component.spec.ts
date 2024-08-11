import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsSummaryComponent } from './measurements-summary.component';

describe('MeasurementsSummaryComponent', () => {
  let component: MeasurementsSummaryComponent;
  let fixture: ComponentFixture<MeasurementsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementsSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
