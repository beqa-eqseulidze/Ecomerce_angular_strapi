import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TwoLevelSubCategoriesLinksComponent } from './twoLevelSubCategoriesLinks/twoLevelSubCategoriesLinks.component';
import { OneLevelSubCategoriesLinksComponent } from './oneLevelSubCategoriesLinks/oneLevelSubCategoriesLinks.component';
import { BtnDeleteComponent } from './buttons/btn-delete/btn-delete.component';
import { BtnEditComponent } from './buttons/btn-edit/btn-edit.component';
import { LoaderComponent } from './loader/loader.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TwoLevelSubCategoriesLinksComponent,
    OneLevelSubCategoriesLinksComponent,
    BtnDeleteComponent,
    BtnEditComponent,
    LoaderComponent,
    PaginationComponent,
    SearchComponent
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
    BtnEditComponent,
    LoaderComponent,
    PaginationComponent
  ]
})
export class ShareModule { }
