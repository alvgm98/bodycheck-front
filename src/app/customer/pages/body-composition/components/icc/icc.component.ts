import { Component, effect, input, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';

import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { TooltipComponent } from '../../../../../shared/ui/tooltip/tooltip.component';
echarts.use([GaugeChart, SVGRenderer]);

@Component({
  selector: 'app-icc',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TooltipComponent],
  templateUrl: './icc.component.html',
  styleUrl: './icc.component.scss',
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class IccComponent implements OnInit {
  icc = input.required<number>();
  iccChart!: EChartsOption;

  gender = input.required<string>();

  iccLegend: { color: string, value: number, text: string }[] = [];
  ngOnInit() {
    this.iccLegend = this.gender() === 'M' ? [
      { color: '#78d0ba', value: 0.8, text: 'Riesgo Bajo' },
      { color: '#FDDD60', value: 0.9, text: 'Riesgo Moderado' },
      { color: '#FF6E76', value: 1, text: 'Riesgo Alto' }
    ] : [
      { color: '#78d0ba', value: 0.7, text: 'Riesgo Bajo' },
      { color: '#FDDD60', value: 0.85, text: 'Riesgo Moderado' },
      { color: '#FF6E76', value: 1, text: 'Riesgo Alto' }
    ];
  }

  constructor() {
    effect(() => {
      if (this.gender()) {
        this.renderChart(this.icc())
      }
    })
  }

  renderChart(icc: number) {
    this.iccChart = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '55%'],
          radius: '100%',
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 8,
              color: [
                [this.iccLegend[0].value, this.iccLegend[0].color],
                [this.iccLegend[1].value, this.iccLegend[1].color],
                [this.iccLegend[2].value, this.iccLegend[2].color],
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 4,
            distance: 5,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 12,
            distance: 5,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 16,
            distance: -60,
            rotate: 'tangential',
            formatter: function () {
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 26,
            color: 'inherit'
          },
          detail: {
            fontSize: 34,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value) {
              return value.toFixed(2);
            },
            color: 'inherit'
          },
          data: [
            {
              value: icc,
              name: 'ICC'
            }
          ]
        }
      ]
    };
  }
}
