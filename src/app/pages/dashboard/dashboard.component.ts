import { Component, effect, ElementRef } from '@angular/core';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ModalOverlayComponent } from '../../components/modal-overlay/modal-overlay.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { ErrorService } from '../../services/error.service';
import { MessageModalComponent } from '../../components/message-modal/message-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CustomerListComponent, AgendaComponent, ModalOverlayComponent, CustomerFormComponent, AppointmentFormComponent, MessageModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showCustomerForm = false;
  showAppointmentForm = false;

  errorMessages: string[] = [];
  successMessages: string[] = [];

  constructor(
    private errorService: ErrorService,
    private el: ElementRef
  ) {
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
    const overlay = this.el.nativeElement.querySelector('app-modal-overlay');
    overlay.classList.remove('overlay-fade-in-animation');
    overlay.classList.add('overlay-fade-out-animation');

    if (this.showCustomerForm) {
      const customerForm = this.el.nativeElement.querySelector('app-customer-form');
      customerForm.classList.remove('form-pop-up-animation');
      customerForm.classList.add('form-pop-down-animation');
      setTimeout(() => this.showCustomerForm = false, 300);
    }
    if (this.showAppointmentForm) {
      const appointmentForm = this.el.nativeElement.querySelector('app-appointment-form');
      appointmentForm.classList.remove('form-pop-up-animation');
      appointmentForm.classList.add('form-pop-down-animation');
      setTimeout(() => this.showAppointmentForm = false, 300);
    }
  }

  closeErrorMessage(index: number) {
    this.errorMessages.splice(index);
    this.errorService.errorMessage.set('');
  }

  addSuccessMessage(message: string) {
    this.successMessages.push(message);
  }
  closeSuccessMessage(index: number) {
    this.successMessages.splice(index);
  }
}
