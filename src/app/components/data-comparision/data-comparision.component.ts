import { Component } from '@angular/core';

@Component({
  selector: 'data-comparision',
  templateUrl: './data-comparision.component.html',
  styleUrls: ['./data-comparision.component.css'],
})
export class DataComparisionComponent {
  token = localStorage.getItem('token');
  data = [];
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
    console.log(this.data);
  }
  ngOnInit() {
    this.fetchKpi2Data();
  }
}
