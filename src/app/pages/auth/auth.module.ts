import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    redirectTo:'/auth/signIn',
    pathMatch:'full'
  },
  {
    path:'signIn',
    component:SignInComponent
  },
  {
    path:'signUp',
    component:SignUpComponent
  }
]

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    ReactiveFormsModule,
   
  ]
})
export class AuthModule { }
