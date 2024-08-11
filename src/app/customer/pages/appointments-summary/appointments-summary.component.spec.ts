import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsSummaryComponent } from './appointments-summary.component';

describe('AppointmentsSummaryComponent', () => {
  let component: AppointmentsSummaryComponent;
  let fixture: ComponentFixture<AppointmentsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
