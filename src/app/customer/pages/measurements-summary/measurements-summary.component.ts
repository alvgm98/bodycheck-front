import { Component, input, OnInit } from '@angular/core';
import { Measurement } from '../../../shared/models/measurement';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-measurements-summary',
  standalone: true,
  imports: [NgClass],
  templateUrl: './measurements-summary.component.html',
  styleUrl: './measurements-summary.component.scss'
})
export class MeasurementsSummaryComponent implements OnInit {

  measurements = input<Measurement[]>();
  selected!: number; // Valdrá el indice de la medición seleccionada o -1 si esta seleccionado el añadir medición

  constructor() {
  }

  ngOnInit(): void {
    // Seleccionamos la última medicion si la hay.
    if (!this.measurements()) {
      this.selected = -1;
    } else {
      this.selected = this.measurements()!.length - 1;
    }
  }

  /**
   * Maneja la selección de una medición para visualizar sus detalles o prepara el formulario
   * para añadir una nueva medición.
   *
   * @param index - Índice de la medición seleccionada en el array de `measurements`.
   *                Si el valor es -1, se muestra un formulario vacío para crear una nueva medición.
   */
  selectMeasurement(index: number) {
    this.selected = index;
  }

}
