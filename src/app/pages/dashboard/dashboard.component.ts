import { Component, effect } from '@angular/core';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ModalOverlayComponent } from '../../components/modal-overlay/modal-overlay.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { ErrorModalComponent } from '../../components/error-modal/error-modal.component';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CustomerListComponent, AgendaComponent, ModalOverlayComponent, CustomerFormComponent, AppointmentFormComponent, ErrorModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showCustomerForm = false;
  showAppointmentForm = false;

  errorMessages: string[] = [];

  constructor(private errorService: ErrorService) {
    effect(() => {
      if (errorService.errorMessage()) {
        this.errorMessages.push(errorService.errorMessage());
      }
    })
  }

  openCustomerForm() {
    this.showCustomerForm = true;
  }
  openAppointmentForm() {
    this.showAppointmentForm = true;
  }

  closeModals() {
    this.showCustomerForm = false;
    this.showAppointmentForm = false;
  }

  closeError(index: number) {
    this.errorMessages.splice(index);
    this.errorService.errorMessage.set('');
  }
}
