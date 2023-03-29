import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as _ from 'lodash';
import { extractKpiData } from 'src/helpers.ts/utils';

@Component({
  selector: 'app-kpi3-data',
  templateUrl: './kpi3-data.component.html',
  styleUrls: ['./kpi3-data.component.css'],
})
export class Kpi3DataComponent {
  token = localStorage.getItem('token');
  data = { predictions: [], sum: 0 };
  chart: any;
  loading: boolean = false;

  async fetchKpi3Data() {
    this.loading = true;

    const comparisionData = await fetch(
      'https://fe-test-api-gateway.circly.info/api/v1/customers/data/kpi3',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    ).finally(() => (this.loading = false));
    this.data = await comparisionData.json();

    const totalData = extractKpiData(this.data);

    this.chart = new Chart('Chart3', {
      type: 'line',

      data: {
        labels: totalData.map((el: any) => el.month),
        datasets: [
          {
            label: 'Prediction for Year 2023-2024',
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
    this.fetchKpi3Data();
  }
}
