import * as _ from 'lodash';

export function extractKpiData(data: { predictions: any[]; sum: number }) {
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

  const yearData = _.groupBy(data.predictions, ({ date }) =>
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

  return totalDataBothYear;
}

export async function getKpiData(kpiname: string) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(
      `https://fe-test-api-gateway.circly.info/api/v1/customers/data/kpi${kpiname}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
