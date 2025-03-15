import { Injectable } from '@angular/core';

import * as echarts from 'echarts';
import { BodyComposition } from '../../../../../shared/models/body-composition';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LinePieDatasetChartService {

  private mmBool!: boolean; // Se encarga de comprobar si la masa muscular ha sido calculada
  private moBool!: boolean; // Se encarga de comprobar si la masa osea ha sido calculada

  private source!: any[][];

  /** Se ecarga de inicializar los datos con los que trabajará echarts */
  initSource(data: BodyComposition[], mgFormulaSelected: string) {
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
      const mg = measurement.mg.find((mg) => mg.formula === mgFormulaSelected)!.value;
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
  }

  getOption() {
    return {
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
          center: ['70%', '25%'],
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
          data: this.selectData(this.source[0].length - 1)
        }
      ]
    };
  }


  exportChartAsPNG(data: BodyComposition[], mgFormulaSelected: string) {
    this.initSource(data, mgFormulaSelected);

    // Siempre deberia exister document ya que este servicio es llamado con un evento del DOM
    const chartContainer = document.createElement('div');
    chartContainer.style.width = '1400px';
    chartContainer.style.height = '600px';

    const myChart = echarts.init(chartContainer, null, { renderer: 'svg' });

    myChart.setOption(this.getOption());

    return new Promise((resolve) => {
      setTimeout(() => {
        const imageBase64 = myChart.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#fff'
        });
        myChart.dispose(); // Liberar memoria
        resolve(imageBase64);
      }, 2000); // Dejo 2 segundos para que renderice el gráfico correctamente
    });
  }

  selectData(index: number) {
    if (this.source[2][index] === null) {
      return [{ value: this.source[1][index], name: this.source[1][0], itemStyle: { color: '#109d8a' } }];
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
}
