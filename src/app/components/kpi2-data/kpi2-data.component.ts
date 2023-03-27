import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as _ from 'lodash';
import { extractKpiData } from 'src/helpers.ts/utils';

@Component({
  selector: 'app-kpi2-data',
  templateUrl: './kpi2-data.component.html',
  styleUrls: ['./kpi2-data.component.css'],
})
export class Kpi2DataComponent {
  token = localStorage.getItem('token');
  data: any;
  chart: any;
  async fetchKpi2Data() {
    const comparisionData = await fetch(
      'https://fe-test-api-gateway.circly.info/api/v1/customers/data/kpi2',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    this.data = await comparisionData.json();
    console.log('kpi2', this.data);

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

    const firstSeries = extractKpiData(this.data[0]);

    const secondSeries = extractKpiData(this.data[1]);

    this.chart = new Chart('Chart2', {
      type: 'line',
      data: {
        labels: firstSeries.map((el: any) => el.month),
        datasets: [
          {
            label: 'Year 2022-2023', // Name the series
            data: firstSeries.map((el: any) => el.total), // Specify the data values array
            fill: false,
            borderColor: '#2196f3', // Add custom color border (Line)
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            borderWidth: 1, // Specify bar border width
          },
          {
            label: 'Year 2022-2019', // Name the series
            data: secondSeries.map((el: any) => el.total), // Specify the data values array
            fill: false,
            borderColor: '#4CAF50', // Add custom color border (Line)
            backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
            borderWidth: 1, // Specify bar border width
          },
        ],
      },
      options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
      },
    });
  }
  ngOnInit() {
    this.fetchKpi2Data();
  }
}
