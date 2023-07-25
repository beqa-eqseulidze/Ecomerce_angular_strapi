import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagerComponent } from './product-manager.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { ShareModule } from 'src/app/share/share.module';
import { AuthInterceptor } from 'src/app/core/inteceptor/auth.interceptor';

const routes:Routes=[
  {
    path:'',    
    component:ProductManagerComponent   
  },
  {
    path:'create',   
    component:CreateEditProductComponent
  },
  {
    path:'edit/:id',
    component:CreateEditProductComponent
  }

]


@NgModule({
  declarations: [
    ProductManagerComponent,
    CreateEditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ShareModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     }
  ]
})
export class ProductManagerModule { }
