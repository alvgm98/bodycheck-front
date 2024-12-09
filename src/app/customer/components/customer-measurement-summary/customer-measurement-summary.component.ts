import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { CustomerMeasurementComponent } from '../../ui/customer-measurement/customer-measurement.component';
import { Measurement } from '../../../shared/models/measurement';

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
    const scrollerElement = this.el.nativeElement.querySelector(".scroller");
    const visibleWidth = scrollerElement.clientWidth; // Ancho del measurement

    scrollerElement.scrollTo({
      left: scrollerElement.scrollWidth - (visibleWidth * 2),
    })
  }

  /**
   * Método para ordenar ascendentemente las mediciones por su sesion
   */
  private sortMeasurements(measurements: Measurement[]): Measurement[] {
    return measurements.sort((a, b) => a.session - b.session);
  }

  /** Se encarga de scrollear a la izquierda y bloquear esta posibilidad si llega al limite */
  scrollToLeft() {
    // Desbloqueamos scroll a la derecha
    this.maxScrollRight = false;

    const scrollerElement = this.el.nativeElement.querySelector(".scroller");
    const visibleWidth = scrollerElement.clientWidth; // Ancho del measurement

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
    const visibleWidth = scrollerElement.clientWidth; // Ancho del measurement

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
