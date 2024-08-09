import { Component, input, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerDetailed } from '../../models/customer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerAppointmentComponent } from './components/customer-appointment/customer-appointment.component';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';

@Component({
  selector: 'app-customer-detailed',
  standalone: true,
  imports: [CustomerCardComponent, MatProgressSpinnerModule, CustomerAppointmentComponent],
  templateUrl: './customer-detailed.component.html',
  styleUrl: './customer-detailed.component.scss'
})
export class CustomerDetailedComponent implements OnInit {

  customerId = input.required<number>();
  customer!: CustomerDetailed;

  appointmentIndex: number = 0;
  measurementIndex: number = 0;

  loading = true;

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.customerService.loadCustomer(this.customerId()).subscribe({
      next: (data) => {
        this.customer = data;
        this.appointmentIndex = data.appointments!.length - 1;
        this.measurementIndex = data.measurements!.length - 1;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

}
