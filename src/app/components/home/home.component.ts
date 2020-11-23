import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Filetype } from 'src/app/enums/filetype.enum';
import { PageMode } from 'src/app/enums/page-mode.enum';
import { UploadResult } from 'src/app/models/uploadResult.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  uploads: UploadResult[] = [];
  uploadForm = new FormGroup({
    fileInput: new FormControl()
  })

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    // this.apiService.getUploadResults().subscribe((uploads: UploadResult[]) => {
    //   this.uploads = uploads;
    // },
    // (error: HttpErrorResponse) => {
    //   // Show error
    // });

    this.uploads = [ 
      {
        id: 1,
        name: 'firstfile.txt',
        type: Filetype.txt,
        metadata: [
          { 
            tableName: 'firstfile.txt',
            fieldName: 'name',
            isProtected: true
          }
        ] 
      },
      {
        id: 2,
        name: 'secondfile.xsls',
        type: Filetype.xsls,
        metadata: [
          { 
            tableName: 'tab one',
            fieldName: 'id',
            isProtected: true
          },
          {
            tableName: 'tab one',
            fieldName: 'favourite color',
            isProtected: false
          },
          {
            tableName: 'tab two',
            fieldName: 'gender',
            isProtected: false
          },
        ] 
      },
      {
        id: 3,
        name: 'thirdfile.txt',
        type: Filetype.txt,
        metadata: [
        ] 
      }
    ]
  }

  uploadFile(event: any) {
    const fileToUpload = event.target.files?.item(0);
    if(fileToUpload != null)
    {
      this.apiService.pageMode = PageMode.View;
        this.apiService.selectedUpload = this.uploads[1];
        this.router.navigateByUrl('/view-edit');

      this.apiService.uploadFile(fileToUpload).subscribe((result: UploadResult) => {
        this.apiService.pageMode = PageMode.View;
        this.apiService.selectedUpload = result;
        this.router.navigateByUrl('/view-edit');
      });
    }
  }
}
 
/*
[] Implement login screen on UI
[] Create models on API to match UI requests and responses
[] Ensure file uploading uploads to database (The UploadResult objects)
*/