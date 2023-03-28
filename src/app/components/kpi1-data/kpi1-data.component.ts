import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as _ from 'lodash';
import { extractKpiData, getKpiData } from 'src/helpers.ts/utils';

@Component({
  selector: 'app-kpi1-data',
  templateUrl: './kpi1-data.component.html',
  styleUrls: ['./kpi1-data.component.css'],
})
export class Kpi1DataComponent {
  token = localStorage.getItem('token');
  data = { predictions: [], sum: 0 };
  totalData: Array<{ month: string; total: number }> = [];
  chart: any;

  async fetchKpi1Data() {
    const turnoverPrediction = await getKpiData('1');
    this.data = turnoverPrediction;

    const totalData = extractKpiData(this.data);

    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: totalData.map((el: any) => el.month),
        datasets: [
          {
            label: 'Turnover prediction for 2023-2024',
            data: totalData.map((el: any) => el.total),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  ngOnInit() {
    this.fetchKpi1Data();
  }
}
