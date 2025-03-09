import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(name: string, password: string) {
    return this.httpClient.post<LoginResponse>("/login", { name, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("authToken", value.token)
        sessionStorage.setItem("username", value.name)
      })
    );
  }
}
