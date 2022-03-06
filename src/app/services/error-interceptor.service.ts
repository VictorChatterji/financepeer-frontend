import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SensitiveService } from './sensitive.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private sensitive: SensitiveService,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          if ([401, 403].indexOf(err.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            // this.auth.logout();
            // window.location.href = window.location.href;
            this.sensitive.confirmUser(null);
            this.router.navigate(['/login']);
          }
          return throwError(err);
        })
      );
  }
}
