import { Component } from '@angular/core';

@Component({
  selector: 'app-kpi2-data',
  templateUrl: './kpi2-data.component.html',
  styleUrls: ['./kpi2-data.component.css'],
})
export class Kpi2DataComponent {
  token = localStorage.getItem('token');
  data = {};
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
  }
  ngOnInit() {
    this.fetchKpi2Data();
  }
}
