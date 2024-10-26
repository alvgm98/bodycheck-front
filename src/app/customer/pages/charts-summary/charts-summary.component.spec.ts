import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsSummaryComponent } from './charts-summary.component';

describe('ChartsSummaryComponent', () => {
  let component: ChartsSummaryComponent;
  let fixture: ComponentFixture<ChartsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
