import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TwoLevelSubCategoriesLinksComponent } from './twoLevelSubCategoriesLinks/twoLevelSubCategoriesLinks.component';
import { OneLevelSubCategoriesLinksComponent } from './oneLevelSubCategoriesLinks/oneLevelSubCategoriesLinks.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TwoLevelSubCategoriesLinksComponent,
    OneLevelSubCategoriesLinksComponent

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule
    
  ],
  exports:[
    HeaderComponent
  ]
})
export class ShareModule { }
