import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-particular-data',
  templateUrl: './particular-data.component.html',
  styleUrls: ['./particular-data.component.scss']
})
export class ParticularDataComponent implements OnInit {
  data: any;
  payload: { id: string } = {
    id: ''
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private list: AuthService,
    private snack: MatSnackBar
  ) {
    this.payload.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getTableData(this.payload);
  }

  goBack() {
    this.router.navigate(['/list']);
  }

  getTableData(payload: { id: string }) {
    this.list.particulardata(payload).subscribe((res: any) => {
      this.data = res.data
    },
      (error: string) => {
        this.snack.open(error, 'Close', {
          duration: 6000
        })
      })
  }

}
