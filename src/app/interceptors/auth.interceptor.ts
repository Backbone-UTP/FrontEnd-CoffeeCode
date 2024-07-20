import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const clonedRequest = request.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
  });

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return auth.refreshToken().pipe(
          switchMap((res) => {
            return next(clonedRequest);
          }),
          catchError((err) => {
            console.log(err);
            localStorage.clear();
            auth.logout();
            router.navigate(['/login']);
            throw err;
          }),
        );
      }
      throw error;
    }),
  );
};
