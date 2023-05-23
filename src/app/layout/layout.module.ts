import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';


const routes:Routes=[
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import('src/app/pages/home/home.module').then(m=>m.HomeModule)
      },
      {
        path:'auth',
        loadChildren:()=>import('src/app/pages/auth/auth.module').then(m=>m.AuthModule)
      },
      {
        path:'cart',
        loadChildren:()=>import('src/app/pages/cart/cart.module').then(m=>m.CartModule)
      },
      {
        path:'**',
        loadChildren:()=>import('src/app/pages/not-found/not-found.module').then(m=>m.NotFoundModule)
      }
    ]
  }
    
]


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule
  ]
 
})
export class LayoutModule { }
