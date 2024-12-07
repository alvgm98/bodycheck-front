import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCustomerComponent } from './export-customer.component';

describe('ExportCustomerComponent', () => {
  let component: ExportCustomerComponent;
  let fixture: ComponentFixture<ExportCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
