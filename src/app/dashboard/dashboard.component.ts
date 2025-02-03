import { Component, effect } from '@angular/core';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ModalOverlayComponent } from '../shared/components/modal-overlay/modal-overlay.component';
import { CustomerFormComponent } from '../shared/pages/customer-form/customer-form.component';
import { AppointmentFormComponent } from '../shared/pages/appointment-form/appointment-form.component';
import { ModalService } from '../shared/pages/modal.service';
import { Appointment } from '../shared/models/appointment';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CustomerListComponent, AgendaComponent, ModalOverlayComponent, CustomerFormComponent, AppointmentFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showCustomerForm = false;
  showAppointmentForm = false;

  selectedAppointment: Appointment | null = null;

  constructor(
    private modalService: ModalService
  ) {
    /* Modal Service */
    effect(() => {
      const showOverlay = modalService.showOverlay();

      if (showOverlay) {
        this.showCustomerForm = modalService.showCustomerForm();
        this.showAppointmentForm = modalService.showAppointmentForm();
      }

      if (!showOverlay) {
        setTimeout(() => this.closeModals(), 300);
      }
    })
  }

  /* Formularios Modales  */
  openCustomerForm() {
    this.modalService.openCustomerForm();
  }
  openAppointmentForm(appointment: Appointment | null) {
    this.selectedAppointment = appointment;
    this.modalService.openAppointmentForm();
  }
  closeModals() {
    this.showCustomerForm = false;
    this.showAppointmentForm = false;
  }
}
