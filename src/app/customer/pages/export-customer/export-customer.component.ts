import { Component, input } from '@angular/core';
import { SelectInputComponent } from '../../../shared/ui/select-input/select-input.component';
import { LinePieDatasetChartService } from '../charts-summary/components/line-pie-dataset-chart/line-pie-dataset-chart.service';
import { BodyCompositionService } from '../../../shared/services/body-composition.service';
import { CustomerDetailed } from '../../../shared/models/customer';
import { FORMULAS } from '../../../shared/models/constants/formulas.constants';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-export-customer',
  standalone: true,
  imports: [SelectInputComponent, MatProgressSpinner],
  templateUrl: './export-customer.component.html',
  styleUrl: './export-customer.component.scss'
})
/** Esta pagina exportará los datos del cliente seleccionado en el formato seleccionado */
export class ExportCustomerComponent {
  EXPORT_FORMATS = [
    { key: "PDF", value: "PDF" },
    { key: "JSON", value: "JSON" },
    /* { key: "XML", value: "XML" },
    { key: "CSV", value: "CSV" }, */
  ]

  customer = input.required<CustomerDetailed>();

  selectedFormat: string = "";
  exportHasError = false;

  loading: boolean = false;

  constructor(
    private bcService: BodyCompositionService,
    private lpService: LinePieDatasetChartService
  ) { }

  selectFormat(format: string) {
    this.selectedFormat = format;
    this.exportHasError = false;
  }

  export() {
    if (!this.selectedFormat) {
      this.exportHasError = true;
      return;
    }

    switch (this.selectedFormat) {
      case "PDF":
        this.exportPDF();
        break;
      case "JSON":
        this.exportJSON();
        break;
    }
  }

  exportPDF() {
    this.loading = true;
    const bcList = this.bcService.getBodyCompositionList(this.customer());

    const p = this.lpService.exportChartAsPNG(bcList, FORMULAS.DURNIN_WOMERSLEY);
    p.then((imageBase64) => {
      this.loading = false;
      console.log(imageBase64);
    });
  }

  exportJSON() {
    const bcList = this.bcService.getBodyCompositionList(this.customer());

    const exportItem = {
      customer: this.customer(),
      bodyComposition: bcList
    }

    const json = JSON.stringify(exportItem);

    // Crear un Blob a partir de la cadena JSON
    const blob = new Blob([json], { type: 'application/json' });

    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${this.customer().firstName}_${this.customer().lastName.replace(" ", "_")}.json`; // Nombre del archivo a descargar

    // Simular un clic en el enlace para iniciar la descarga
    link.click();
  }
}
