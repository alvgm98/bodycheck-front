import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  showOverlay = signal<boolean>(false);
  showCustomerForm = signal<boolean>(false);
  showAppointmentForm = signal<boolean>(false);

  closeAll() {
    this.showOverlay.set(false);
    this.showCustomerForm.set(false);
    this.showAppointmentForm.set(false);
  }

  openCustomerForm() {
    this.showOverlay.set(true);
    this.showCustomerForm.set(true);
  }

  openAppointmentForm() {
    this.showOverlay.set(true);
    this.showAppointmentForm.set(true);
  }

}
