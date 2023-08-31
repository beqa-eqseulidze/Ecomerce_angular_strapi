import { NgModule, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagerComponent } from './category-manager.component';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { TableComponent } from './table/table.component';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share/share.module';
import { MainCategoryComponent } from './main-category/main-category.component';
import { OneLevelSubCategoryComponent } from './one-level-sub-category/one-level-sub-category.component';
import { TwoLevelSubCategoryComponent } from './two-level-sub-category/two-level-sub-category.component'; 



const routes:Routes=[
  // {
  //   path:'',
  //   redirectTo:'main_categories',
  //   pathMatch:'full'
  // },
  {
    path:'',
    component:CategoryManagerComponent,
    children:[
      {
        path:'',
        redirectTo:'main-category',
        pathMatch:'full'
      },
      {
        path:'main-category',
        component:MainCategoryComponent
      },
      {
        path:'one-level-sub-category',
        component:OneLevelSubCategoryComponent
      },
      {
        path:'two-level-sub-category',
        component:TwoLevelSubCategoryComponent
      }
    ]  
  },
  {
    path:'main-category/create',
    component:CreateEditCategoryComponent
  },
  {
    path:'one-level-sub-category/create',
    component:CreateEditCategoryComponent
  },
  {
    path:'two-level-sub-category/create',
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
    TableComponent,
    MainCategoryComponent,
    OneLevelSubCategoryComponent,
    TwoLevelSubCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),   
    ReactiveFormsModule,
    ShareModule
  ]
})
export class CategoryManagerModule { }
