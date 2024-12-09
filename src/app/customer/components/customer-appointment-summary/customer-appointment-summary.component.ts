import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, input } from '@angular/core';
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
  appointments = input.required({
    transform: (value: Appointment[]) => this.sortAppointments(value)
  });

  maxScrollLeft: boolean = false;
  maxScrollRight: boolean = false;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    if (this.appointments().length > 0) {
      this.scrollToInit();
    } else {
      this.maxScrollLeft = true;
      this.maxScrollRight = true;
      this.cdr.detectChanges();
    }
  }

  /**
   * Scrollea a la ultima cita si esta existe
   */
  private scrollToInit() {
    const scrollerElement = this.el.nativeElement.querySelector(".scroller");
    const visibleWidth = scrollerElement.clientWidth; // Ancho del appointment

    scrollerElement.scrollTo({
      left: scrollerElement.scrollWidth - (visibleWidth * 2),
    })
  }

  /**
   * Método para ordenar ascendentemente las citas por su fecha de inicio
   */
  private sortAppointments(appointments: Appointment[]): Appointment[] {
    return appointments.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  /** Se encarga de scrollear a la izquierda y bloquear esta posibilidad si llega al limite */
  scrollToLeft() {
    // Desbloqueamos scroll a la derecha
    this.maxScrollRight = false;

    const scrollerElement = this.el.nativeElement.querySelector(".scroller");
    const visibleWidth = scrollerElement.clientWidth; // Ancho del appointment

    const nextScrollPosition = scrollerElement.scrollLeft - visibleWidth; // Proxima posicion del scroll despues de la animacion smooth

    /**
     * Bloqueamos scroll a la izquierda si llegó al limite
     *
     * Habrá llegado al limite por la izquierda si la proxima posicion del scroll es 0
     * o menor que el tamaño visible
     */
    this.maxScrollLeft = nextScrollPosition < visibleWidth;

    scrollerElement.scrollTo({
      left: nextScrollPosition,
      behavior: 'smooth'
    })

  }

  /** Se encarga de scrollear a la derecha y bloquear esta posibilidad si llega al limite */
  scrollToRight() {
    // Desbloqueamos scroll a la izquierda
    this.maxScrollLeft = false;

    const scrollerElement = this.el.nativeElement.querySelector(".scroller");
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

    scrollerElement.scrollTo({
      left: nextScrollPosition,
      behavior: 'smooth',
    });
  }

}
