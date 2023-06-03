import { NgModule, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagerComponent } from './category-manager.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
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
    component:CreateCategoryComponent
  },
  {
    path:':categoryType/edit/:id',
    component:EditCategoryComponent
  }
]

@NgModule({
  declarations: [
    CategoryManagerComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
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
