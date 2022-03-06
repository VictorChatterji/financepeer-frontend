/**
 * @author victor
 * Error Handler for whole application
 */

 import { Optional, Injectable } from '@angular/core';
 import { throwError } from 'rxjs';
 import { HttpErrorResponse } from '@angular/common/http';
 import { Router } from '@angular/router';
 import { SensitiveService } from '../services/sensitive.service';
 
 @Injectable({
     providedIn: 'root'
 })
 export class ErrorService {
     message: string | undefined;
     constructor(
         @Optional() private router: Router,
         @Optional() private sensitive: SensitiveService
     ) { }
     handleError = (err: HttpErrorResponse) => {
         if (err.error instanceof ErrorEvent) {
             // client-side error
             this.message = `Client-side Error: ${err.error.message}`;
         } else {
             // server-side error
             switch (err.status) {
                 case 0:
                     this.message = `Web Server Down!`;
                     break;
                 case 403:
                 case 401:
                     this.message = `${err.error.message}`;
                     this.sensitive.confirmUser(null); // dont forget this beauty, this is end of complete flow of application
                     this.router.navigate(['/login']);
                     break;
                 case 422:
                     this.message = `${err.error.message}`;
                     break;
                 case 500:
                     this.message = `Server Side Issue!`;
                     break;
                 default:
                     this.message = `${err.error.message}`;
                     break;
             }
         }
         return throwError(this.message);
     }
 }
 