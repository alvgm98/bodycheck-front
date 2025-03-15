import { Component, OnDestroy, ElementRef, input, effect } from '@angular/core';
import * as echarts from 'echarts';
import { BodyComposition } from '../../../../../shared/models/body-composition';
import { FORMULAS } from '../../../../../shared/models/constants/formulas.constants';
import { SelectInputComponent } from '../../../../../shared/ui/select-input/select-input.component';
import { LinePieDatasetChartService } from './line-pie-dataset-chart.service';

@Component({
  selector: 'app-line-pie-dataset-chart',
  standalone: true,
  imports: [SelectInputComponent],
  templateUrl: './line-pie-dataset-chart.component.html',
  styleUrls: ['./line-pie-dataset-chart.component.scss'],
})
export class LinePieDatasetChartComponent implements OnDestroy {
  private myChart: any;

  bodyCompositionList = input<BodyComposition[]>(); // Listado de medidas de composición corporal

  // Opciones del select y valor predeterminado
  mgFormulaSelected: string = FORMULAS.DURNIN_WOMERSLEY;
  formulas = [
    { key: FORMULAS.DURNIN_WOMERSLEY, value: FORMULAS.DURNIN_WOMERSLEY },
    { key: FORMULAS.JACKSON_POLLOCK_7, value: FORMULAS.JACKSON_POLLOCK_7 },
    { key: FORMULAS.JACKSON_POLLOCK_3, value: FORMULAS.JACKSON_POLLOCK_3 },
    { key: FORMULAS.WELTMAN, value: FORMULAS.WELTMAN },
    { key: FORMULAS.NAVY_TAPE, value: FORMULAS.NAVY_TAPE }
  ];

  onSelectFormula(value: string): void {
    this.mgFormulaSelected = value;
    this.lpService.initSource(this.bodyCompositionList()!, value);
    this.initChart();
  }

  constructor(
    private lpService: LinePieDatasetChartService,
    private el: ElementRef
  ) {
    effect(() => {
      const data = this.bodyCompositionList();

      if (data) {
        this.lpService.initSource(data, this.mgFormulaSelected);
        this.initChart();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.dispose();
    }
  }

  private initChart(): void {
    const chartDom = this.el.nativeElement.querySelector('#line-pie-dataset-chart');

    this.myChart = echarts.init(chartDom, null, { renderer: 'svg' });

    const option = this.lpService.getOption();

    this.myChart.on('updateAxisPointer', (event: any) => {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        this.myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: `{b}: {@[${dimension}]}Kg ({d}%)`
            },
            encode: {
              value: dimension,
              tooltip: dimension
            },
            data: this.lpService.selectData(event.dataIndex + 1)
          }
        });
      }
    });

    this.myChart.setOption(option);
  }
}
