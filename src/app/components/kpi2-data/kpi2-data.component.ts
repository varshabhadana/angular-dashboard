import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as _ from 'lodash';

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

    const firstSeriesData = this.data[0];
    const firstSeriesGroupedYearData = _.groupBy(
      firstSeriesData.predictions,
      ({ date }) => new Date(date).getFullYear()
    );
    const firstSeriesKeys = Object.keys(firstSeriesGroupedYearData);

    const totalDataFirstSeries = firstSeriesKeys.map((el) => {
      const total = firstSeriesGroupedYearData[el].reduce(
        (sum: number, item: { prediction: number; date: string }) =>
          sum + item.prediction,
        0
      );
      return { year: el, total };
    });

    const secondSeriesData = this.data[1];
    const secondSeriesGroupedYearData = _.groupBy(
      secondSeriesData.predictions,
      ({ date }) => new Date(date).getFullYear()
    );
    const secondSeriesKeys = Object.keys(secondSeriesGroupedYearData);

    const totalDataSecondSeries = secondSeriesKeys.map((el) => {
      const total = secondSeriesGroupedYearData[el].reduce(
        (sum: number, item: { prediction: number; date: string }) =>
          sum + item.prediction,
        0
      );
      return { year: el, total };
    });

    const totalDataFirstSeriesWithPreviousYears = [
      { year: '2019', total: NaN },
      { year: '2020', total: NaN },
      { year: '2021', total: NaN },
      ...totalDataFirstSeries,
    ];

    /* const combinedArray = [...totalDataSecondSeries, ...totalDataFirstSeries]; */

    this.chart = new Chart('Chart2', {
      type: 'line',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Year 2019-2022', // Name the series
            data: totalDataSecondSeries.map((el: any) => el.total), // Specify the data values array
            fill: false,
            borderColor: '#2196f3', // Add custom color border (Line)
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            borderWidth: 1, // Specify bar border width
          },
          {
            label: 'Year 2022-2013', // Name the series
            data: totalDataFirstSeriesWithPreviousYears.map(
              (el: any) => el.total
            ), // Specify the data values array
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
