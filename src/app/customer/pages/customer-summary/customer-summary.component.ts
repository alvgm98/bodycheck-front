import { Component, Input } from '@angular/core';
import { CustomerCardComponent } from '../../components/customer-card/customer-card.component';
import { CustomerAppointmentSummaryComponent } from '../../components/customer-appointment-summary/customer-appointment-summary.component';
import { CustomerMeasurementSummaryComponent } from '../../components/customer-measurement-summary/customer-measurement-summary.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerDetailed } from '../../../shared/models/customer';

@Component({
  selector: 'app-customer-summary',
  standalone: true,
  imports: [CustomerCardComponent, CustomerAppointmentSummaryComponent, CustomerMeasurementSummaryComponent, MatProgressSpinnerModule],
  templateUrl: './customer-summary.component.html',
  styleUrl: './customer-summary.component.scss'
})
export class CustomerSummaryComponent {
  @Input() customer?: CustomerDetailed;

}
