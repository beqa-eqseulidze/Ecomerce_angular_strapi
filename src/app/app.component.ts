import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {AuthService,UserService,UploadImageUrlsService } from 'src/app/core/services';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
 
})
export class AppComponent implements OnInit{
  title = 'Ecomerce';


  constructor(
    private authService:AuthService,
    private userService:UserService,    
    private http:HttpClient,
    private uploadImageUrlsService:UploadImageUrlsService
    ){}


    // form:FormGroup=new FormGroup({
    //   title:new FormControl('', Validators.required)
    // })



    submit(){
      // if(this.form.valid){
      //   console.log({...this.form.value,imageUrls:this.uploadImageUrlsService.imageUrls$.getValue()})
      //   this.form.reset()    
      //   location.reload()
      // }
    }


  




  ngOnInit(): void {
  //  this.authService.signIn({identifier:'ana@gmail.com',password:'A123456'}).subscribe()
  }
  
  //  this.authService.signIn({identifier:'beqa@gmail.com',password:'B123456'}).subscribe();
  //  setTimeout(() => {
  //   this.authService.unsubscribe$.next('');
  //   this.authService.unsubscribe$.complete();
  // },1000)
  

}
