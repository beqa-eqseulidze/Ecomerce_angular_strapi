import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagerComponent } from './category-manager/category-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { ShareModule } from 'src/app/share/share.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes:Routes=[
  {
    path:'',
    redirectTo:'/contentManager/categoryManager/main_categories',
    pathMatch:'full'
  },
  {
    path:'categoryManager',
    redirectTo:'/contentManager/categoryManager/main_categories',
    pathMatch:'full'
  },
  {
    path:'categoryManager/:categoryType',
    component:CategoryManagerComponent,
    children:[
      {
        path:'create',
        component:CreateCategoryComponent
      },
      {
        path:'edit/:id',
        component:EditCategoryComponent
      }
    ]
       
  }

]

@NgModule({
  declarations: [
    CategoryManagerComponent,
    TableComponent,
    CreateCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AngularMaterialModule,
    ShareModule
   
  ]
})
export class ContentManagerModule { }
