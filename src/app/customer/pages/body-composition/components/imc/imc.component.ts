import { Component, effect, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';

import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { TooltipComponent } from '../../../../../shared/ui/tooltip/tooltip.component';
echarts.use([GaugeChart, SVGRenderer]);

@Component({
  selector: 'app-imc',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TooltipComponent],
  templateUrl: './imc.component.html',
  styleUrl: './imc.component.scss',
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class ImcComponent {

  imc = input.required<number>();
  imcChart!: EChartsOption;

  imcLegend = [
    { color: '#21c3ef', value: 0.4, text: 'Delgadez severa' },
    { color: '#58D9F9', value: 0.4625, text: 'Bajo peso' },
    { color: '#78d0ba', value: 0.625, text: 'Saludable' },
    { color: '#FDDD60', value: 0.75, text: 'Sobrepeso' },
    { color: '#FF6E76', value: 1, text: 'Obesidad' }
  ];

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
          center: ['50%', '55%'],
          radius: '100%',
          min: 0,
          max: 40,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 8,
              color: [
                [this.imcLegend[0].value, this.imcLegend[0].color],
                [this.imcLegend[1].value, this.imcLegend[1].color],
                [this.imcLegend[2].value, this.imcLegend[2].color],
                [this.imcLegend[3].value, this.imcLegend[3].color],
                [this.imcLegend[4].value, this.imcLegend[4].color]
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
