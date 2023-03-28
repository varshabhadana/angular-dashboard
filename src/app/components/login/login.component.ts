import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /*  email: string = '';
  password: string = ''; */
  loginForm!: FormGroup;
  show: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  loginInvalid: boolean = false;

  constructor(
    private fb: FormBuilder,

    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async userLogin() {
    this.loginInvalid = false;
    this.emailError = false;
    this.passwordError = false;
    const { email, password } = this.loginForm.value;
    if (!email) {
      this.emailError = true;
      return;
    }
    if (!password) {
      this.passwordError = true;
      return;
    }

    const loginResponse = await fetch(
      'https://fe-test-api-gateway.circly.info/api/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const responseData = await loginResponse.json();

    if (loginResponse.status === 200) {
      this.show = true;
      this.router.navigate(['/']);
      localStorage.setItem('token', responseData.jwt);
    }

    if (loginResponse.status !== 200) {
      this.loginInvalid = true;
    }
  }
}
