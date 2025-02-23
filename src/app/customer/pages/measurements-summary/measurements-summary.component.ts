import { Component, input, OnInit, signal } from '@angular/core';
import { Measurement } from '../../../shared/models/measurement';
import { NgClass } from '@angular/common';
import { MeasurementFormComponent } from '../../components/measurement-form/measurement-form.component';
import { CustomerDetailed } from '../../../shared/models/customer';
import { BodyCompositionComponent } from '../body-composition/body-composition.component';

@Component({
  selector: 'app-measurements-summary',
  standalone: true,
  imports: [MeasurementFormComponent, BodyCompositionComponent, NgClass],
  templateUrl: './measurements-summary.component.html',
  styleUrl: './measurements-summary.component.scss'
})
export class MeasurementsSummaryComponent implements OnInit {

  customer = input.required<CustomerDetailed>();
  selected: number = -1; // Valdrá el indice de la medición seleccionada o -1 si esta seleccionado el añadir medición

  triggerUpdateBodyComposition = signal(0); // Este trigger ejecuta los cambios en BodyComposition cuando se actualiza la medición seleccionada

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

  /**
   * Actualiza la lista de mediciones del cliente de manera que coincida con la bdd sin necesidad de llamar al back
   *
   * @param measurement - Medición modificada en back
   */
  updateMeasurements(measurement: Measurement) {
    if (measurement.session > this.customer().measurements!.length) {
      this.customer().measurements!.push(measurement);
      this.selected = measurement.session - 1;
    } else {
      this.customer().measurements![measurement.session - 1] = measurement;
    }

    this.triggerUpdateBodyComposition.set(this.triggerUpdateBodyComposition() + 1) // IMPORTANTE hacer esto ya que la signal de customer no ejecuta effects al modificar el array measurements.
  }

}
