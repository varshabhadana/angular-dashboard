import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  login(data: any) {
    this.http
      .post('https://fe-test-api-gateway.circly.info/api/v1/auth/login', data)
      .subscribe((result: any) => {
        localStorage.setItem('token', result.jwt),
          this.router.navigate(['/home']);
      });
  }
}
