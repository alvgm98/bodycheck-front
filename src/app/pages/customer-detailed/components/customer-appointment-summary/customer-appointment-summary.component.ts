import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, input } from '@angular/core';
import { CustomerAppointmentComponent } from '../customer-appointment/customer-appointment.component';
import { Appointment } from '../../../../models/appointment';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-customer-appointment-summary',
  standalone: true,
  imports: [CustomerAppointmentComponent, NgClass],
  templateUrl: './customer-appointment-summary.component.html',
  styleUrl: './customer-appointment-summary.component.scss'
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
    const scroller = this.el.nativeElement.querySelector(".scroller");
    const appointmentWidth = this.el.nativeElement.querySelector('app-customer-appointment').offsetWidth;

    scroller.scrollTo({
      left: scroller.scrollWidth - (appointmentWidth * 2),
    })
  }

  /**
   * Método para ordenar ascendentemente las citas por su fecha de inicio
   */
  private sortAppointments(appointments: Appointment[]): Appointment[] {
    return appointments.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  scrollToLeft() {
    // Desbloqueamos el scroll a la derecha por si esta bloqueado
    this.maxScrollRight = false;

    const scroller = this.el.nativeElement.querySelector(".scroller");
    const appointmentWidth = this.el.nativeElement.querySelector('app-customer-appointment').offsetWidth;

    scroller.scrollTo({
      left: scroller.scrollLeft - appointmentWidth,
      behavior: 'smooth'
    })

    // Bloqueamos el scroll a la izquierda al llegar al máximo
    this.maxScrollLeft = scroller.scrollLeft <= appointmentWidth + 100;
  }

  scrollToRight() {
    // Desbloqueamos el scroll a la izquierda por si esta bloqueado
    this.maxScrollLeft = false;

    const scroller = this.el.nativeElement.querySelector(".scroller");
    const appointmentWidth = this.el.nativeElement.querySelector('app-customer-appointment').offsetWidth;

    scroller.scrollTo({
      left: scroller.scrollLeft + appointmentWidth,
      behavior: 'smooth'
    })

    /*
     * Se debe calcular cuando se muestra 'add-appointment' con 2 scroll de anterioridad,
     * Uno al usar scroll-behavior: 'smooth', ya que calcula antes de que comience el scroll.
     * Otra ya que el maximo de scroll, es scroll width - element width.
     */
    // Bloqueamos el scroll a la derecha al llegar al máximo
    const auxWidth = this.appointments().length - 1;
    this.maxScrollRight = scroller.scrollLeft >= (appointmentWidth * auxWidth + 100 * auxWidth);
  }

}
