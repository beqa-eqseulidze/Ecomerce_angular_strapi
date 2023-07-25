import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';

import { CategoryManagerModule } from 'src/app/pages/content-manager/category-manager/category-manager.module';
import { CategoryManagerComponent } from './category-manager/category-manager.component';

const routes:Routes=[
    {
      path:'',
      redirectTo:'content-manager/category-manager',
      pathMatch:'full'
    },
    {
      path:'category-manager',
      loadChildren:()=>import('src/app/pages/content-manager/category-manager/category-manager.module').then(m=>m.CategoryManagerModule)
    },
    {
      path:'product-manager',
      loadChildren:()=>import('src/app/pages/content-manager/product-manager/product-manager.module').then(m=>m.ProductManagerModule)
    }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    // ReactiveFormsModule,    
  ]
})
export class ContentManagerModule { }
