import { AfterViewInit, ChangeDetectorRef, Component, input, Renderer2 } from '@angular/core';
import { CustomerAppointmentComponent } from '../../ui/customer-appointment/customer-appointment.component';
import { NgClass } from '@angular/common';
import { Appointment } from '../../../shared/models/appointment';

@Component({
  selector: 'app-customer-appointment-summary',
  standalone: true,
  imports: [CustomerAppointmentComponent, NgClass],
  templateUrl: './customer-appointment-summary.component.html',
  host: {
    'class': 'summary-host'
  }
})
export class CustomerAppointmentSummaryComponent implements AfterViewInit {
  appointments = input<Appointment[]>();

  maxScrollLeft: boolean = false;
  maxScrollRight: boolean = false;

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    if (this.appointments()!.length > 0) {
      // Deshabilita boton scrollLeft si solo hay una cita
      if (this.appointments()!.length === 1) {
        this.maxScrollLeft = true;
      }

      this.scrollToInit();
    } else {
      this.maxScrollLeft = true;
      this.maxScrollRight = true;
    }
    this.cdr.detectChanges(); // Tengo que forzar la deteccion de cambios para que se muestren instananeamente al hacerlo en el contexto de AfterViewInit
  }

  /**
   * Scrollea a la ultima cita si esta existe
   */
  private scrollToInit() {
    const scrollerElement = this.renderer.selectRootElement('#appointment-scroller', true);
    const visibleWidth = scrollerElement.clientWidth; // Ancho del appointment

    this.renderer.setProperty(scrollerElement, 'scrollLeft', scrollerElement.scrollWidth - (visibleWidth * 2));

    // Hacemos que el scroll se comporte 'smooth' después de la primera animación
    this.renderer.setStyle(scrollerElement, 'scrollBehavior', 'smooth');
  }

  /** Se encarga de scrollear a la izquierda y bloquear esta posibilidad si llega al limite */
  scrollToLeft() {
    // Desbloqueamos scroll a la derecha
    this.maxScrollRight = false;

    const scrollerElement = this.renderer.selectRootElement('#appointment-scroller', true);
    const visibleWidth = scrollerElement.clientWidth; // Ancho del appointment

    const nextScrollPosition = scrollerElement.scrollLeft - visibleWidth; // Proxima posicion del scroll despues de la animacion smooth

    /**
     * Bloqueamos scroll a la izquierda si llegó al limite
     *
     * Habrá llegado al limite por la izquierda si la proxima posicion del scroll es 0
     * o menor que el tamaño visible
     */
    this.maxScrollLeft = nextScrollPosition < visibleWidth;

    this.renderer.setProperty(scrollerElement, 'scrollLeft', nextScrollPosition);

  }

  /** Se encarga de scrollear a la derecha y bloquear esta posibilidad si llega al limite */
  scrollToRight() {
    // Desbloqueamos scroll a la izquierda
    this.maxScrollLeft = false;

    const scrollerElement = this.renderer.selectRootElement('#appointment-scroller', true);
    const visibleWidth = scrollerElement.clientWidth; // Ancho del appointment

    const nextScrollPosition = scrollerElement.scrollLeft + visibleWidth; // Proxima posicion del scroll despues de la animacion smooth
    const maxScrollableDistance = scrollerElement.scrollWidth - visibleWidth; // Limite del scroll

    /**
     * Bloqueamos scroll a la derecha si llegó al limite
     *
     * Habrá llegado al limite si la diferencia entre la proxima posicion del scroll
     * y el maximo scrolleable es menor que el tamaño visible
     */
    this.maxScrollRight = maxScrollableDistance - nextScrollPosition < visibleWidth;

    this.renderer.setProperty(scrollerElement, 'scrollLeft', nextScrollPosition);
  }

}
