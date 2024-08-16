import { Component, effect, input, OnInit } from '@angular/core';
import { CustomerSummaryComponent } from './pages/customer-summary/customer-summary.component';
import { CustomerDetailed } from '../shared/models/customer';
import { CustomerService } from '../shared/services/customer.service';
import { ModalService } from '../shared/pages/modal.service';
import { CustomerFormComponent } from '../shared/pages/customer-form/customer-form.component';
import { ModalOverlayComponent } from '../shared/components/modal-overlay/modal-overlay.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CustomerSummaryComponent, ModalOverlayComponent, CustomerFormComponent],
  templateUrl: './customer.component.html',
  styles: [`
    :host {
      flex: 1;
      box-sizing: border-box;
      width: 100%;
      padding: 60px 100px;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class CustomerComponent implements OnInit {
  customerId = input.required<number>();
  customer?: CustomerDetailed;

  showCustomerForm: boolean = false;

  loading = true;

  constructor(
    private customerService: CustomerService,
    private modalService: ModalService
  ) {
    /* Modal Service */
    effect(() => {
      const showOverlay = modalService.showOverlay();

      if (showOverlay) {
        this.showCustomerForm = modalService.showCustomerForm();
        // this.showAppointmentForm = modalService.showAppointmentForm();
      }

      if (!showOverlay) {
        setTimeout(() => this.closeModals(), 300);
      }
    })
  }

  ngOnInit(): void {
    this.customerService.loadCustomer(this.customerId()).subscribe({
      next: (data) => {
        this.customer = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  private closeModals() {
    this.showCustomerForm = false;
    // this.showAppointmentForm = false;
  }
}
