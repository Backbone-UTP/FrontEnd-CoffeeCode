import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private readonly auth: AuthService,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
    ]),
  });

  invalidCredentials: boolean = false;

  onSubmit() {
    this.invalidCredentials = false;
    console.log(this.loginForm.value, this.loginForm.valid);

    if (this.loginForm.valid) {
      this.auth
        .login(this.loginForm.value.email!, this.loginForm.value.password!)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/profile']);
          },
          error: (err: any) => {
            this.invalidCredentials = true;
            console.log(err.error.message);
          },
        });
    }
  }
}
