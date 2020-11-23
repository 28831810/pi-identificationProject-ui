import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Filetype } from 'src/app/enums/filetype.enum';
import { PageMode } from 'src/app/enums/page-mode.enum';
import { Metadata } from 'src/app/models/metadata.model';

@Component({
  selector: 'app-view-edit-upload-result',
  templateUrl: './view-edit-upload-result.component.html',
  styleUrls: ['./view-edit-upload-result.component.css']
})
export class ViewEditUploadResultComponent implements OnInit {
  title!: string;
  isEdit!: boolean;
  detailsForm!: FormGroup;

  displayedColumns!: string[];
  dataSource!: MatTableDataSource<Metadata>;
  selection = new SelectionModel<Metadata>(true, []);

  constructor(private service: ApiService, private fb: FormBuilder, private router: Router) {
    this.isEdit = this.service.pageMode === PageMode.Edit;
    this.title = this.isEdit ? 'Edit Upload' : 'View Upload';
    this.displayedColumns =  [ 'tableName', 'fieldName', 'select' ];
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Metadata>(this.service.selectedUpload.metadata);
    const selectedUpload = this.service.selectedUpload;
    this.detailsForm = this.fb.group({
      idInput: new FormControl(
        { value: selectedUpload.id,
          disabled: true
        }
      ),
      nameInput: new FormControl(
        { value: selectedUpload.name,
          disabled: true
        }
      ),
      typeInput: new FormControl(
        { value: this.getTypeDescription(selectedUpload.type),
          disabled: true
        }
      )
    });

    this.service.selectedUpload.metadata.forEach((meta: Metadata) => {
      if(meta.isProtected)
      {
        this.selection.select(meta);
      }
    });
  }

  getTypeDescription(type: Filetype): string
  {
    switch(type){
      case Filetype.txt: return 'TXT';
      case Filetype.xsls: return 'XSLS';
    }
  }

  onUpdate(){
    this.selection.selected.forEach((selectedMeta: Metadata) => {
      const meta = this.service.selectedUpload.metadata.find(meta => meta === selectedMeta);
      if(meta != null){
        meta.isProtected = true;
      }
    });

    this.service.updateResult(this.service.selectedUpload).subscribe((result) => {
      if(result)
      {
        alert('Updated successfully!');
        this.router.navigateByUrl('/home');
      }
      else
      {
        alert('Updated failed!');
      }
    });
  }

  onBack() {
    this.router.navigateByUrl('/home');
  }
}
