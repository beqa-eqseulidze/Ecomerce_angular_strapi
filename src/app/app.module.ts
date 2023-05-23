import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'


import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/inteceptor/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes:Routes=[
  {
    path:'',
    loadChildren:()=>import('src/app/layout/layout.module').then(m=>m.LayoutModule)
    
  }
]


@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
