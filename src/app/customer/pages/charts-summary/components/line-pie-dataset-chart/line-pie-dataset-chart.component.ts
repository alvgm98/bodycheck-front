import { Component, OnInit, OnDestroy, ElementRef, input, effect } from '@angular/core';
import * as echarts from 'echarts';
import { BodyComposition } from '../../../../../shared/models/body-composition';

@Component({
  selector: 'app-line-pie-dataset-chart',
  standalone: true,
  templateUrl: './line-pie-dataset-chart.component.html',
  styleUrls: ['./line-pie-dataset-chart.component.scss'],
})
export class LinePieDatasetChartComponent implements OnDestroy {
  private myChart: any;

  bodyCompositionList = input<BodyComposition[]>([]);

  constructor(private el: ElementRef) {
    effect(() => {
      const data = this.bodyCompositionList();

      const source = [
        ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
        ['Masa Grasa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
        ['Masa Osea', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
        ['Masa Muscular', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ['Masa Residual', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
      ];


      this.initChart(source);
    })
  }

  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.dispose();
    }
  }

  private initChart(source: any): void {
    const chartDom = this.el.nativeElement.querySelector('#line-pie-dataset-chart');

    this.myChart = echarts.init(chartDom, null, { renderer: 'svg' });

    const option = {
      legend: {
        itemGap: 20,
        orient: 'vertical',
        right: '2.5%',
        bottom: '20%'
      },
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: source
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
            formatter: '{b}: {@2012} ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '2012',
            tooltip: '2012'
          },
          data: [
            { value: source[1][1], name: source[1][0], itemStyle: { color: "#FDDD60" } },
            { value: source[2][1], name: source[2][0], itemStyle: { color: "#21c3ef" } },
            { value: source[3][1], name: source[3][0], itemStyle: { color: "#FF6E76" } },
            { value: source[4][1], name: source[4][0], itemStyle: { color: "#9E9E9E" } }
          ]
        }
      ]
    };

    this.myChart.on('updateAxisPointer', (event: any) => {
      console.log(event)

      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        this.myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: `{b}: {@[${dimension}]} ({d}%)`
            },
            encode: {
              value: dimension,
              tooltip: dimension
            },
            data: [
              { value: source[1][event.dataIndex + 1], name: source[1][0], itemStyle: { color: "#FDDD60" } },
              { value: source[2][event.dataIndex + 1], name: source[2][0], itemStyle: { color: "#21c3ef" } },
              { value: source[3][event.dataIndex + 1], name: source[3][0], itemStyle: { color: "#FF6E76" } },
              { value: source[4][event.dataIndex + 1], name: source[4][0], itemStyle: { color: "#9E9E9E" } }
            ]
          }
        });
      }
    });

    this.myChart.setOption(option);
  }
}
