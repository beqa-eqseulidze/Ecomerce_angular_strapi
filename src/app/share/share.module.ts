import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TwoLevelSubCategoriesLinksComponent } from './twoLevelSubCategoriesLinks/twoLevelSubCategoriesLinks.component';
import { OneLevelSubCategoriesLinksComponent } from './oneLevelSubCategoriesLinks/oneLevelSubCategoriesLinks.component';
import { BtnDeleteComponent } from './btn-delete/btn-delete.component';
import { BtnEditComponent } from './btn-edit/btn-edit.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TwoLevelSubCategoriesLinksComponent,
    OneLevelSubCategoriesLinksComponent,
    BtnDeleteComponent,
    BtnEditComponent

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule
    
  ],
  exports:[
    HeaderComponent,
    BtnDeleteComponent,
    BtnEditComponent
  ]
})
export class ShareModule { }
