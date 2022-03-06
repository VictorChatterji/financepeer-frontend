import { SensitiveService } from './../../services/sensitive.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { IUser } from '../../interfaces/i-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {


  hide = true;
  loginForm: FormGroup;
  private onDestroy = new Subject<void>();
  loading = false;


  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private auth: AuthService,
    private sensitive: SensitiveService,
    private cdr: ChangeDetectorRef,
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.sensitive.user$.pipe(takeUntil(this.onDestroy))
      .subscribe(
        (user: IUser) => {
          if (!user) {
            return;
          }
          this.redirectUser(user);
        }
      );
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.loading = false;
  }

  onLoginSubmit() {
    const value = this.loginForm.value;
    const payload = {
      user: value.user,
      password: value.password
    };
    this.loading = true;
    this.loginForm.disable();

    this.auth
      .login(payload)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => {
          this.loginForm.enable();
          this.loading = false;
          this.cdr.markForCheck();
        }) // new thing
      )
      .subscribe(
        (user: IUser) => {
          this.redirectUser(user);
        },
        (error: string) => {
          // console.log('error1');
          this.snack.open(error, 'Close', {
            duration: 7000
          });
        }
      );
  }

  redirectUser(user: any) {
    this.router.navigate(['/upload']);
  }
}


