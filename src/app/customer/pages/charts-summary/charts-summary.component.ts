import { Component, input } from '@angular/core';
import { CustomerDetailed } from '../../../shared/models/customer';
import { BodyCompositionService } from '../../../shared/services/body-composition.service';

@Component({
  selector: 'app-charts-summary',
  standalone: true,
  imports: [],
  templateUrl: './charts-summary.component.html',
  styleUrl: './charts-summary.component.scss'
})
export class ChartsSummaryComponent {
  customer = input.required<CustomerDetailed>();

  constructor(private bcService: BodyCompositionService) { }
}
