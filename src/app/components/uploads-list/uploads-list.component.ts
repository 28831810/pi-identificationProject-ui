import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UploadResult } from 'src/app/models/uploadResult.model';

@Component({
  selector: 'app-uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.css']
})
export class UploadsListComponent implements OnInit {
  uploadsDataSource: MatTableDataSource<UploadResult> = new MatTableDataSource<UploadResult>([]);
  displayedColumns = ['uploadName', 'edit'];

  @Input() uploads: UploadResult[] = [];
  
  constructor(private router: Router) { 

  }

  ngOnInit(): void {
    this.uploadsDataSource = new MatTableDataSource<UploadResult>(this.uploads);
  }

  onEdit(uploadResult: UploadResult) {
    this.router.navigateByUrl('/dghags');
  }
}
