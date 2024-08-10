import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Measurement } from '../../../../models/measurement';
import { CustomerMeasurementComponent } from '../customer-measurement/customer-measurement.component';

@Component({
  selector: 'app-customer-measurement-summary',
  standalone: true,
  imports: [CustomerMeasurementComponent, NgClass],
  templateUrl: './customer-measurement-summary.component.html',
  host: {
    'class': 'summary-host'
  }
})
export class CustomerMeasurementSummaryComponent implements AfterViewInit {
  measurements = input.required({
    transform: (value: Measurement[]) => this.sortMeasurements(value)
  });

  maxScrollLeft: boolean = false;
  maxScrollRight: boolean = false;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    if (this.measurements().length > 0) {
      this.scrollToInit();
    } else {
      this.maxScrollLeft = true;
      this.maxScrollRight = true;
      this.cdr.detectChanges();
    }
  }

  /**
   * Scrollea a la ultima medición si esta existe
   */
  private scrollToInit() {
    const scroller = this.el.nativeElement.querySelector(".scroller");
    const measurementWidth = this.el.nativeElement.querySelector('app-customer-measurement').offsetWidth;

    scroller.scrollTo({
      left: scroller.scrollWidth - (measurementWidth * 2 + 100),
    })
  }

  /**
   * Método para ordenar ascendentemente las mediciones por su sesion
   */
  private sortMeasurements(measurements: Measurement[]): Measurement[] {
    return measurements.sort((a, b) => a.session - b.session);
  }

  scrollToLeft() {
    // Desbloqueamos el scroll a la derecha por si esta bloqueado
    this.maxScrollRight = false;

    const scroller = this.el.nativeElement.querySelector(".scroller");
    const measurementWidth = this.el.nativeElement.querySelector('app-customer-measurement').offsetWidth;

    scroller.scrollTo({
      left: scroller.scrollLeft - measurementWidth,
      behavior: 'smooth'
    })

    // Bloqueamos el scroll a la izquierda al llegar al máximo
    this.maxScrollLeft = scroller.scrollLeft <= measurementWidth + 100;
  }

  scrollToRight() {
    // Desbloqueamos el scroll a la izquierda por si esta bloqueado
    this.maxScrollLeft = false;

    const scroller = this.el.nativeElement.querySelector(".scroller");
    const measurementWidth = this.el.nativeElement.querySelector('app-customer-measurement').offsetWidth;

    scroller.scrollTo({
      left: scroller.scrollLeft + measurementWidth,
      behavior: 'smooth'
    })

    /*
     * Se debe calcular cuando se muestra 'add-appointment' con 2 scroll de anterioridad,
     * Uno al usar scroll-behavior: 'smooth', ya que calcula antes de que comience el scroll.
     * Otra ya que el maximo de scroll, es scroll width - element width.
     */
    // Bloqueamos el scroll a la derecha al llegar al máximo
    const auxWidth = this.measurements().length - 1;
    this.maxScrollRight = scroller.scrollLeft >= (measurementWidth * auxWidth + 100 * auxWidth);
  }
}
