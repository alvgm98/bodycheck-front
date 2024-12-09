import { Component } from '@angular/core';
import { SelectInputComponent } from '../../../shared/ui/select-input/select-input.component';

@Component({
  selector: 'app-export-customer',
  standalone: true,
  imports: [SelectInputComponent],
  templateUrl: './export-customer.component.html',
  styleUrl: './export-customer.component.scss'
})
/** Esta pagina exportará los datos del cliente seleccionado en el formato seleccionado */
export class ExportCustomerComponent {
  EXPORT_FORMATS = [
    {key: "PDF", value: "PDF"},
    {key: "JSON", value: "JSON"},
    {key: "XML", value: "XML"},
    {key: "CSV", value: "CSV"},
  ]

  selectedFormat: string = "";
  exportHasError = false;

  selectFormat(format: string) {
    this.selectedFormat = format;
    this.exportHasError = false;
  }

  export() {
    if (!this.selectedFormat) {
      this.exportHasError = true;
      return;
    }

    /* EXPORTACIÓN */
  }

}
