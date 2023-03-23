import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  token = localStorage.getItem('token');

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
    const kpiData = await turnoverPrediction.json();
    console.log(kpiData);
  }
  ngOnInit() {
    this.fetchKpi1Data();
  }
}
