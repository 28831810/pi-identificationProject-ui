import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Filetype } from 'src/app/enums/filetype.enum';
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

  constructor(private apiService: ApiService) {
    console.log('Length:', this.uploads.length);
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
      this.apiService.uploadFile(fileToUpload);
    }
  }
}
 
/*
[] Implement login screen on UI
[] Create models on API to match UI requests and responses
[] Ensure file uploading uploads to database (The UploadResult objects)
*/