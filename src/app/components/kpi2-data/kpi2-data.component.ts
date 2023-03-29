import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as _ from 'lodash';
import { getKpiData } from 'src/helpers.ts/utils';

@Component({
  selector: 'app-kpi2-data',
  templateUrl: './kpi2-data.component.html',
  styleUrls: ['./kpi2-data.component.css'],
})
export class Kpi2DataComponent {
  data: any;
  chart: any;
  async fetchKpi2Data() {
    const comparisionData = await getKpiData('2');
    this.data = comparisionData;

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
    let yearNames = [
      ...new Set([...firstSeriesKeys, ...secondSeriesKeys]),
    ].sort();

    const totalDataFirstSeriesWithPreviousYears = yearNames.map((year) =>
      totalDataFirstSeries.some((el) => el.year === year)
        ? totalDataFirstSeries.find((el) => el.year === year)
        : { year, total: NaN }
    );

    this.chart = new Chart('Chart2', {
      type: 'line',
      data: {
        labels: yearNames,
        datasets: [
          {
            label: `Year ${totalDataFirstSeries[0].year} - ${
              totalDataFirstSeries[totalDataFirstSeries.length - 1].year
            }`,
            data: totalDataFirstSeriesWithPreviousYears.map(
              (el: any) => el.total
            ),
            fill: false,
            borderColor: '#2196f3',
            backgroundColor: '#2196f3',
            borderWidth: 1,
          },
          {
            label: `Year ${totalDataSecondSeries[0].year} - ${
              totalDataSecondSeries[totalDataSecondSeries.length - 1].year
            }`,
            data: totalDataSecondSeries.map((el: any) => el.total),
            fill: false,
            borderColor: '#4CAF50',
            backgroundColor: '#4CAF50',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
  ngOnInit() {
    this.fetchKpi2Data();
  }
}
