import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoryManagerModule } from 'src/app/pages/content-manager/category-manager/category-manager.module';
import { CategoryManagerComponent } from './category-manager/category-manager.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
    {
      path:'',
      redirectTo:'content-manager/category-manager',
      pathMatch:'full'
    },
    {
      path:'category-manager',
      loadChildren:()=>import('src/app/pages/content-manager/category-manager/category-manager.module').then(m=>m.CategoryManagerModule)
    }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ContentManagerModule { }
