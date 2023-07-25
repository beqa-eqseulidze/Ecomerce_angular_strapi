import { NgModule, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagerComponent } from './category-manager.component';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { TableComponent } from './table/table.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share/share.module'; 



const routes:Routes=[
  {
    path:'',
    redirectTo:'category-manager/main_categories',
    pathMatch:'full'
  },
  {
    path:':categoryType',
    component:CategoryManagerComponent
  },
  {
    path:':categoryType/create',
    component:CreateEditCategoryComponent
  },
  {
    path:':categoryType/edit/:id',
    component:CreateEditCategoryComponent
  }
]

@NgModule({
  declarations: [
    CategoryManagerComponent,
    CreateEditCategoryComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),   
    ReactiveFormsModule,
    ShareModule
  ]
})
export class CategoryManagerModule { }
