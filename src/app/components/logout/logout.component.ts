import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  token = localStorage.getItem('token');
  constructor(private router: Router) {}

  async userLogout() {
    const logoutResponse = await fetch(
      'https://fe-test-api-gateway.circly.info/api/v1/auth/logout',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    if (logoutResponse.status === 200) {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
    }
  }
}
