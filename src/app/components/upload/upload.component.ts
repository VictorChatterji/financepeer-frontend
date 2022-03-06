import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  selectedFileHab: any;

  constructor(
    private upload: AuthService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  selectFileHab(files: FileList) {
    const selectedFile = files.item(0);
    if (selectedFile) {
      this.upload.choosefile(selectedFile)
        .subscribe((res: any) => {
          this.snack.open(res.message, 'Close', {
            duration: 5000
          })
        })
    } else {
      (error: any) => {
        this.snack.open(error, 'Close', { duration: 5000 })
      };
    }
  }

}
