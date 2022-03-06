import {
  Component,
  ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Router
} from '@angular/router';
import {
  Subject,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from './interfaces/i-response';
import { SensitiveService } from './services/sensitive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  user: any;
  private onDestroy = new Subject<void>();
  constructor(
    private router: Router,
    private _sensitive: SensitiveService
  ) {
    this._sensitive.user$
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe({
        next: (user: IUser) => {
          this.user = user;
        }
      });
    this.router.events.subscribe(() => {
      this.sidenav.close();
    });
  }
  

  close() {
    this.sidenav.close();
  }

  ngOnInit() {}
}
