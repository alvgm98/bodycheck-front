import { Component, effect, input } from '@angular/core';
import { CustomerDetailed } from '../../../shared/models/customer';
import { BodyCompositionService } from '../../../shared/services/body-composition.service';
import { BodyComposition } from '../../../shared/models/body-composition';
import { LinePieDatasetChartComponent } from './components/line-pie-dataset-chart/line-pie-dataset-chart.component';

@Component({
  selector: 'app-charts-summary',
  standalone: true,
  imports: [LinePieDatasetChartComponent],
  templateUrl: './charts-summary.component.html',
  styleUrl: './charts-summary.component.scss'
})
export class ChartsSummaryComponent {
  customer = input.required<CustomerDetailed>();

  bodyCompositionList!: BodyComposition[];

  constructor(private bcService: BodyCompositionService) {
    effect(() => this.getBodyCompositionList());
  }

  getBodyCompositionList() {
    this.bodyCompositionList = this.bcService.getBodyCompositionList(this.customer());
  }
}
