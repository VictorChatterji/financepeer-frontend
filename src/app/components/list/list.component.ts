import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data: any;

  constructor(
    private json: AuthService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchDataCount()
  }

  fetchDataCount(){
    this.json.datacount()
    .subscribe(
      (res: any) => {
        this.data = res.data
      },
      (error: string) => {
        this.snack.open(error, 'Close', {
          duration: 6000
        })
      }
    )
  }

}
