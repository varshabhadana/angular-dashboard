import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  show: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  async userLogin(data: any) {
    const loginResponse = await fetch(
      'https://fe-test-api-gateway.circly.info/api/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );
    const responseData = await loginResponse.json();
    console.log(responseData.jwt);

    if (loginResponse.status === 200) {
      this.show = true;
      this.router.navigate(['/home']);
      localStorage.setItem('token', responseData.jwt);
    }
    /* this.userService.login(data); */
  }
}
