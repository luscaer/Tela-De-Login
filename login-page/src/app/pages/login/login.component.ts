import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Route, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl,
  password: FormControl,
}

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginform!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService, 
    private toastService: ToastrService
  ) {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  submit() {
    this.loginService.login(this.loginform.value.email, this.loginform.value.password).subscribe({
      next: () => this.toastService.success("Login done successfully"),
      error: () => this.toastService.error("Unexpected error! Try again later.")
    })
  }

  navigate() {
    this.router.navigate(["signup"]);
  }
}
