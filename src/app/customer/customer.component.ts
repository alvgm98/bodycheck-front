import { Component, effect, input, OnInit } from '@angular/core';
import { CustomerSummaryComponent } from './pages/customer-summary/customer-summary.component';
import { Customer, CustomerDetailed } from '../shared/models/customer';
import { CustomerService } from '../shared/services/customer.service';
import { ModalService } from '../shared/pages/modal.service';
import { CustomerFormComponent } from '../shared/pages/customer-form/customer-form.component';
import { ModalOverlayComponent } from '../shared/components/modal-overlay/modal-overlay.component';
import { CustomerTabsComponent } from './components/customer-tabs/customer-tabs.component';
import { TABS } from '../shared/models/constants/tabs.constants';
import { AppointmentsSummaryComponent } from './pages/appointments-summary/appointments-summary.component';
import { MeasurementsSummaryComponent } from './pages/measurements-summary/measurements-summary.component';
import { ChartsSummaryComponent } from './pages/charts-summary/charts-summary.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CustomerTabsComponent, CustomerSummaryComponent, AppointmentsSummaryComponent, MeasurementsSummaryComponent, ChartsSummaryComponent, ModalOverlayComponent, CustomerFormComponent],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
/** Este componente será el encargado de contener todo lo referente a la vista del Customer detallado */
export class CustomerComponent implements OnInit {
  customerId = input.required<number>(); // Recoge la ID del Customer de la URL
  customer?: CustomerDetailed;

  TABS = TABS;
  tabOpened: string = TABS.SUMMARY;

  /* Modales */
  showCustomerForm: boolean = false;
  // showAppointmentForm: boolean = false;

  loading = true;

  constructor(
    private customerService: CustomerService,
    private modalService: ModalService
  ) {
    /* MODAL SERVICE */
    effect(() => {
      const showOverlay = modalService.showOverlay();
      // Abre el modal correspondiente
      if (showOverlay) {
        this.showCustomerForm = modalService.showCustomerForm();
        // this.showAppointmentForm = modalService.showAppointmentForm();
      }
      // Cierra los modales al terminar la animación.
      if (!showOverlay) {
        setTimeout(() => this.closeModals(), 300);
      }
    })
  }

  /**
   * Al iniciar el componente carga el Customer y TODOS sus datos.
   * -> next:    Reemplaza los spinners de carga por los datos del cliente.
   * -> error:   Reemplaza los spinners de carga por mensajes de error.
   */
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

  /**
   * Cierra los modales al instante.
   * IMPORTANTE llamar a este método una vez terminada la animación del modal
   */
  private closeModals() {
    this.showCustomerForm = false;
    // this.showAppointmentForm = false;
  }

  /**
   * Actualiza los datos del Customer a partir de los datos actualizados recibidos del formulario
   * @param updatedCustomer Datos actualizados del customer.
   */
  updateCustomerData(updatedCustomer: Customer) {
    Object.assign(this.customer!, updatedCustomer);
  }
}
