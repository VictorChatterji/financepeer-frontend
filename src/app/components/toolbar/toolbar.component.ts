/**
 * @author victor
 * Toolbar top of the dashboard
 */
 import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SensitiveService } from '../../services/sensitive.service';
import {
  IUser,
} from '../../interfaces/i-response';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  private onDestroy = new Subject<void>();
  user: any = null;
  constructor(
    public dialog: MatDialog,
    private sensitive: SensitiveService,
  ) {
    this.sensitive.user$
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe({
        next: (user: IUser) => {
          this.user = user;
        }
      });
  }

  ngOnInit() {}


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }


  toggleD() {
    this.toggle.emit(null);
  }

}

