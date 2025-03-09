import { Component, OnDestroy, ElementRef, input, effect } from '@angular/core';
import * as echarts from 'echarts';
import { BodyComposition } from '../../../../../shared/models/body-composition';
import moment from 'moment';

@Component({
  selector: 'app-line-pie-dataset-chart',
  standalone: true,
  templateUrl: './line-pie-dataset-chart.component.html',
  styleUrls: ['./line-pie-dataset-chart.component.scss'],
})
export class LinePieDatasetChartComponent implements OnDestroy {
  private myChart: any;
  private source!: any[][];

  private moBool!: boolean; // Se encarga de comprobar si la masa osea ha sido calculada
  private mmBool!: boolean; // Se encarga de comprobar si la masa muscular ha sido calculada

  bodyCompositionList = input<BodyComposition[]>();

  constructor(private el: ElementRef) {
    effect(() => {
      const data = this.bodyCompositionList();

      if (data) {
        this.initSource(data);
        this.initChart();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.dispose();
    }
  }

  private initSource(data: BodyComposition[]): void {
    console.log(data)

    const source: any[][] = [
      ['Composicion Corporal'],
      ['Peso'],
      ['Masa Grasa'],
      ['Masa Osea'],
      ['Masa Muscular'],
      ['Masa Residual'],
    ];

    for (let i = 0; i < data.length; i++) {
      const measurement = data[i];

      // Extraigo las variables
      const date = measurement.date;
      const mt = measurement.mt;
      const mg = measurement.mgDurninWomersley;
      const mo = measurement.mo.value;
      const mm = measurement.mm;

      // Calculo la masa residual
      const mr = mt - (mg + mo + mm);

      source[0].push(moment(date).locale('es').format('DD MMM YYYY'));
      source[1].push(mt.toFixed(2));
      source[2].push(mg ? mg.toFixed(2) : null);
      source[3].push(mo ? mo.toFixed(2) : null);
      source[4].push(mm && mm > 0 ? mm.toFixed(2) : null);
      source[5].push(mr !== mt ? mr.toFixed(2) : null);
    }

    // Compruebo que la masa muscular haya sido calculada al menos una vez
    this.mmBool = data.find((measurement) => measurement.mm !== 0) !== undefined;
    // Compruebo que la masa osea haya sido calculada
    this.moBool = data[0].mo.formula !== '';

    // Añado las columnas de masa osea y masa muscular según corresponda
    if (this.mmBool && !this.moBool) {
      source[4][0] = 'Masa Muscular-Esqueletica';
      source.splice(3, 1);
    } else if (!this.mmBool && !this.moBool) {
      source.splice(3, 1);
      source.splice(4, 1);
    }

    this.source = source;

    console.log(source)
  }

  private selectData(index: number) {
    if (this.source[2][index] === null) {
      return [{value: this.source[1][index], name: this.source[1][0], itemStyle: {color: '#109d8a'}}];
    }

    if (this.mmBool && !this.moBool) {
      return [
        { value: this.source[2][index], name: this.source[2][0], itemStyle: { color: "#FDDD60" } },
        { value: this.source[3][index], name: this.source[4][0], itemStyle: { color: "#FF6E76" } },
        { value: this.source[4][index], name: this.source[5][0], itemStyle: { color: "#9E9E9E" } }
      ]
    } else if (this.mmBool && this.moBool) {
      return [
        { value: this.source[2][index], name: this.source[2][0], itemStyle: { color: "#FDDD60" } },
        { value: this.source[3][index], name: this.source[3][0], itemStyle: { color: "#21c3ef" } },
        { value: this.source[4][index], name: this.source[4][0], itemStyle: { color: "#FF6E76" } },
        { value: this.source[5][index], name: this.source[5][0], itemStyle: { color: "#9E9E9E" } }
      ]
    } else {
      return [
        { value: this.source[2][index], name: this.source[2][0], itemStyle: { color: "#FDDD60" } },
        { value: this.source[3][index], name: this.source[5][0], itemStyle: { color: "#9E9E9E" } }
      ]
    }
  }

  private initChart(): void {
    const chartDom = this.el.nativeElement.querySelector('#line-pie-dataset-chart');

    this.myChart = echarts.init(chartDom, null, { renderer: 'svg' });

    const option = {
      legend: {
        itemGap: 20,
        orient: 'vertical',
        right: '2.5%',
        bottom: '15.4%'
      },
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: this.source
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          color: "#109d8a"
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          color: "#FDDD60"
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          color: "#21c3ef"
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          color: "#FF6E76"
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          color: "#9E9E9E"
        },
        {
          type: 'pie',
          id: 'pie',
          radius: ['16%', '33%'],
          center: ['50%', '25%'],
          padAngle: 4,
          itemStyle: {
            borderRadius: 5
          },
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{b}: {@1}Kg ({d}%)'
          },
          encode: {
            itemName: 'Composicion Corporal',
            value: '1',
            tooltip: '1'
          },
          data: this.selectData(1)
        }
      ]
    };

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
            data: this.selectData(event.dataIndex + 1)
          }
        });
      }
    });

    this.myChart.setOption(option);
  }
}
