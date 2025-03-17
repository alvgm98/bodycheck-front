import { Component, input } from '@angular/core';
import { SelectInputComponent } from '../../../shared/ui/select-input/select-input.component';
import { LinePieDatasetChartService } from '../charts-summary/components/line-pie-dataset-chart/line-pie-dataset-chart.service';
import { BodyCompositionService } from '../../../shared/services/body-composition.service';
import { CustomerDetailed } from '../../../shared/models/customer';
import { FORMULAS } from '../../../shared/models/constants/formulas.constants';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PdfService } from './pdf.service';
import { PdfRequest } from '../../../shared/models/pdf-request';

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
    private lpService: LinePieDatasetChartService,
    private pdfService: PdfService
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
    this.loading = true; // Muestro spinner de carga

    // Calculo todas las formulas de composicion corporal
    const bcList = this.bcService.getBodyCompositionList(this.customer());

    // Obtengo las graficas de cada formula
    const imagePromises = [
      this.lpService.exportChartAsPNG(bcList, FORMULAS.DURNIN_WOMERSLEY),
      this.lpService.exportChartAsPNG(bcList, FORMULAS.JACKSON_POLLOCK_7),
      this.lpService.exportChartAsPNG(bcList, FORMULAS.JACKSON_POLLOCK_3),
      this.lpService.exportChartAsPNG(bcList, FORMULAS.WELTMAN),
      this.lpService.exportChartAsPNG(bcList, FORMULAS.NAVY_TAPE),
    ];

    Promise.all(imagePromises).then((imagesBase64) => {
      const pdfRequest: PdfRequest = {
        customerId: this.customer().id!,
        durninWomersleyBase64Image: (imagesBase64[0] as string).split('base64,')[1],
        jacksonPollock7Base64Image: (imagesBase64[1] as string).split('base64,')[1],
        jacksonPollock3Base64Image: (imagesBase64[2] as string).split('base64,')[1],
        weltmanBase64Image: (imagesBase64[3] as string).split('base64,')[1],
        navyTapeBase64Image: (imagesBase64[4] as string).split('base64,')[1],
      }

      this.pdfService.downloadPdf(pdfRequest).subscribe((blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${this.customer().firstName}_${this.customer().lastName.replace(" ", "_")}.pdf`;
        link.click();

        this.loading = false;
      });
    }).catch((error) => {
      console.error("Error generating images: ", error);
      this.loading = false;
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
