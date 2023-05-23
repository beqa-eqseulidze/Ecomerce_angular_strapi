import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';



@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports:[
    FileUploadComponent
  ]
})
export class FeatureModule { }
