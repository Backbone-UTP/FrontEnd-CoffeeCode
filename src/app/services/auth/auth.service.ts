import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../../environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${environments.BACKEND}/auth/login`, {
      email,
      password,
    });
  }

  refreshToken() {
    return this.http.post(`${environments.BACKEND}/auth/refreshtoken`, {});
  }

  logout() {
    return this.http.post(`${environments.BACKEND}/auth/logout`, {});
  }

  getProfile() {
    return this.http.get(`${environments.BACKEND}/auth/profile`);
  }

  isAuthenticated() {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      return true;
    }

    return false;
  }
}
