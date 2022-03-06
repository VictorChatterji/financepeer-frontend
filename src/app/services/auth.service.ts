import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { USER_API_URL } from '../app.constant';
import { SensitiveService } from './sensitive.service';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private sensitive: SensitiveService,
    private http: HttpClient,
    private errorHandler: ErrorService,
    private snack: MatSnackBar,
  ) { }



  login(payload: { user: string, password: string }): Observable<any> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let body: HttpParams = new HttpParams();
    body = body.append('email', payload.user);
    body = body.append('password', payload.password);



    return this.http.post(`${USER_API_URL}users/login/`, body.toString(), { headers })
      .pipe(
        map((res: any) => {
          const user = res.user_info[0];
          localStorage.setItem('token', JSON.stringify(res.data.token));
          localStorage.setItem('user', JSON.stringify(user));
          this.sensitive.confirmUser(user);
          this.snack.open(res.message, 'Close', {
            duration: 7000
          });
          return user;
        }),
        catchError(this.errorHandler.handleError)
      );
  }

  // logout API
  logout() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(`${USER_API_URL}users/logout/`, { headers })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  choosefile(file: any) {
    // let body: HttpParams = new HttpParams();
    const uploadedFile = new FormData();
    uploadedFile.append('json_file', file, file.name);
    // body = body.append('csv_file', file);
    // console.log(file);
    return this.http.post(`${USER_API_URL}upload/jsonupload/`, uploadedFile).pipe(
      catchError(this.errorHandler.handleError)
    );

  }

  datacount() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(`${USER_API_URL}upload/datacount/`, { headers })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  particulardata(payload: { id: string}): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let body: HttpParams = new HttpParams();
    body = body.append('id', payload.id);

    return this.http.post(`${USER_API_URL}upload/particulardata/`, body.toString(), { headers })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

}




