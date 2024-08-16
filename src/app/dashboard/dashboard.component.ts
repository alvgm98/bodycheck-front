import { Component, effect } from '@angular/core';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ModalOverlayComponent } from '../shared/components/modal-overlay/modal-overlay.component';
import { CustomerFormComponent } from '../shared/pages/customer-form/customer-form.component';
import { AppointmentFormComponent } from '../shared/pages/appointment-form/appointment-form.component';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { ModalService } from '../shared/pages/modal.service';


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
  openAppointmentForm() {
    this.modalService.openAppointmentForm();
  }
  closeModals() {
    this.showCustomerForm = false;
    this.showAppointmentForm = false;
  }
}
