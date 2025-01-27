import { Component, input, OnInit } from '@angular/core';
import { Measurement } from '../../../shared/models/measurement';
import { NgClass } from '@angular/common';
import { MeasurementFormComponent } from '../../components/measurement-form/measurement-form.component';
import { CustomerDetailed } from '../../../shared/models/customer';

@Component({
  selector: 'app-measurements-summary',
  standalone: true,
  imports: [MeasurementFormComponent, NgClass],
  templateUrl: './measurements-summary.component.html',
  styleUrl: './measurements-summary.component.scss'
})
export class MeasurementsSummaryComponent implements OnInit {

  customer = input.required<CustomerDetailed>();
  selected: number = -1; // Valdrá el indice de la medición seleccionada o -1 si esta seleccionado el añadir medición

  /** Al cargar el componente seleccionamos la ultima medición si la hay */
  ngOnInit(): void {
    if (this.customer().measurements) {
      this.selected = this.customer().measurements!.length - 1;
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
