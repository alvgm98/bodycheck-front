import { Injectable, signal } from '@angular/core';
import { NoRegisteredCustomer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  showOverlay = signal<boolean>(false);
  showCustomerForm = signal<boolean>(false);
  showAppointmentForm = signal<boolean>(false);

  // Esta señal sirve para que registrar clientes no registrados que se encuentran en citas
  noRegisteredCustomer = signal<NoRegisteredCustomer>({ name: '', phone: '', appointmentId: 0 });

  closeAll() {
    this.showOverlay.set(false);
    this.showCustomerForm.set(false);
    this.showAppointmentForm.set(false);
  }

  openCustomerForm() {
    this.showOverlay.set(true);
    this.showCustomerForm.set(true);
  }

  /** Abre el formulario de registro de clientes con los datos de un cliente aún no registrado el cuál tiene una cita */
  openCustomerFromForRegister(customerData: NoRegisteredCustomer) {
    this.openCustomerForm();
    this.noRegisteredCustomer.set(customerData);

    setTimeout(() => this.resetNoRegisteredCustomer(), 300); // Reseteo el cliente no registrado después de 300ms para que no se quede guardado para posteriores aperturas del formulario
  }
  resetNoRegisteredCustomer() {
    this.noRegisteredCustomer.set({ name: '', phone: '', appointmentId: 0 });
  }

  openAppointmentForm() {
    this.showOverlay.set(true);
    this.showAppointmentForm.set(true);
  }

}
