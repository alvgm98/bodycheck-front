import { Component, effect, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';


import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
echarts.use([PieChart, TooltipComponent, LegendComponent, SVGRenderer]);

@Component({
  selector: 'app-composition-pie',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './composition-pie.component.html',
  styleUrl: './composition-pie.component.scss',
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class CompositionPieComponent {
  mt = input.required<number>(); // Masa Total
  mg = input.required<number>(); // Masa Grasa
  mo = input<{ formula: string, value: number }>({ formula: '', value: 0 }); // Masa Osea
  mm = input<number>(0); // Masa Muscular -> Si la Masa Osea vale 0, esta será Masa Musculo-Esqueletica

  pieChart!: EChartsOption;

  constructor() {
    effect(() => this.renderChart(this.mt(), this.mg(), this.mo()?.value, this.mm()!))
  }

  renderChart(mt: number, mg: number, mo: number, mm: number) {
    const mr = mt - (mg + mo + mm);

    console.log('mr', mr);
    console.log('mt', mt)
    console.log('mg', mg)
    console.log('mo', mo)
    console.log('mm', mm)

    this.pieChart = {
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          return `<span style="display:inline-block;margin-right:5px;
                  border-radius:50%;width:10px;height:10px;
                  background-color:${params.color};"></span>
                  ${params.name}: ${params.value}Kg (${params.percent}%)`;
        }
      },
      legend: {
        itemGap: 20,
        orient: 'vertical',
        right: '5%',
        top: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'inherit'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: mg, name: 'Masa Grasa', itemStyle: { color: '#FDDD60' } },
            { value: mo, name: 'Masa Osea', itemStyle: { color: '#58D9F9' } },
            { value: mm, name: 'Masa Muscular', itemStyle: { color: '#FF6E76' } },
            { value: mr, name: 'Masa Residual', itemStyle: { color: '#9E9E9E' } }
          ]
        }
      ]
    };
  }
}
