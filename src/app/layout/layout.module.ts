import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { contentManagerGuard } from 'src/app/core/guards/content.manager.guard';


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
        path:'details',
        loadChildren:()=>import('src/app/pages/details/details.module').then(m=>m.DetailsModule)
      },
      {
        path:'auth',
        loadChildren:()=>import('src/app/pages/auth/auth.module').then(m=>m.AuthModule)
      },
      {
        path:'content-manager',
        canActivate: [contentManagerGuard],
        loadChildren:()=>import('src/app/pages/content-manager/content-manager.module').then(m=>m.ContentManagerModule)
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
