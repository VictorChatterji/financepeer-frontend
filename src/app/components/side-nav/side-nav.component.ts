/**
 * @author victor
 * Component for sidebar
 */
 import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
// import { AuthService } from '../../services/';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SensitiveService } from '../../services/sensitive.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  private onDestroy = new Subject<void>();
  user: any;

  constructor(
    // private auth: AuthService,
    public dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private snack: MatSnackBar,
    private sensitive: SensitiveService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.sensitive.user$
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe((user: any) => {
        if (!user) {
          return;
        }
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  logout() {
    this.auth.logout().subscribe((res: any) => {
      if(res){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.sensitive.confirmUser(null);
        this.snack.open(res.message, 'Close', {
          duration: 7000
        });
        this.router.navigate(['/login']);
      }
    });
  }

}


