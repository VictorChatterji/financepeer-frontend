/**
 * @author Victor Neerugatti
 * @description JWT Interceptor service
 */
 import { Injectable } from '@angular/core';
 import {
   HttpInterceptor,
   HttpRequest,
   HttpHandler,
   HttpEvent
 } from '@angular/common/http';
 import { Observable } from 'rxjs';
 import { SensitiveService } from './sensitive.service';
 import { USER_API_URL } from '../app.constant';
 // The JWT interceptor intercepts the incoming requests from the application/user
 // and adds JWT token to the request's Authorization header, only if the user is logged in.
 // This JWT token in the request header is required to access the SECURE END API POINTS on
 // the server
 @Injectable({
   providedIn: 'root'
 })
 export class JwtInterceptorService implements HttpInterceptor {
   constructor(
     private sensitive: SensitiveService
   ) { }
   intercept(
     request: HttpRequest<any>,
     next: HttpHandler
   ): Observable<HttpEvent<any>> {
     // check if the current user is logged in
     // if the user making the request is logged in, he will have token stored in
     // local storage, which is set by Authorization service during the log out
     const currentUser = this.sensitive.currentUserValue;
     let token = localStorage.getItem('token');
     if(token){
       token = JSON.parse(token);
     }
     const isLoggedIn = currentUser && token;
     const isApiUrl = request.url.startsWith(USER_API_URL);
     if (isLoggedIn && isApiUrl) {
       // clone the incoming request and add JWT token in the cloned request
       // Authorization header
       request = request.clone({
         setHeaders: {
           Authorization: `Token ${token}`
         }
       });
     }
     return next.handle(request);
   }
 }
 