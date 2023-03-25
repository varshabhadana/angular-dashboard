import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  token = localStorage.getItem('token');
  data = { predictions: [], sum: 0 };
  totalData: Array<{ month: string; total: number }> = [];
  chart: any;

  async fetchKpi1Data() {
    const turnoverPrediction = await fetch(
      'https://fe-test-api-gateway.circly.info/api/v1/customers/data/kpi1',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    this.data = await turnoverPrediction.json();

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const yearData = _.groupBy(this.data.predictions, ({ date }) =>
      new Date(date).getFullYear()
    );

    const objectKeyYear = Object.keys(yearData);

    let totalDataBothYear: any = [];

    objectKeyYear.forEach((el: any) => {
      const monthData = _.groupBy(yearData[el], ({ date }) =>
        new Date(date).getMonth()
      );

      const objectKey = Object.keys(monthData);

      objectKey.forEach((el: any) => {
        totalDataBothYear.push({
          month: monthNames[el],
          total: monthData[el].reduce(
            (sum: number, item: { prediction: number; date: string }) =>
              sum + item.prediction,
            0
          ),
        });
      });
    });

    this.totalData = totalDataBothYear;

    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.totalData.map((el) => el.month),
        datasets: [
          {
            label: 'Turnover prediction for 2023-2024',
            data: this.totalData.map((el) => el.total),
            borderWidth: 1,
          },
        ],
      },
      options: {
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
