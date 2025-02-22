import { Component, effect, input, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';

import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GaugeChart, CanvasRenderer]);

@Component({
  selector: 'app-imc',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './imc.component.html',
  styleUrl: './imc.component.scss',
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class ImcComponent {

  imc = input.required<number>();
  imcChart!: EChartsOption;

  constructor() {
    effect(() => this.renderChart(this.imc()))
  }

  renderChart(imc: number) {
    this.imcChart = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 40,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.4625, '#58D9F9'],
                [0.625, '#78d0ba'],
                [0.75, '#FDDD60'],
                [1, '#FF6E76']
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
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
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
            formatter: function (value: number) {
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
            formatter: function (value: number) {
              return value.toFixed(1);
            },
            color: 'inherit'
          },
          data: [
            {
              value: imc,
              name: 'IMC'
            }
          ]
        }
      ]
    };
  }
}
