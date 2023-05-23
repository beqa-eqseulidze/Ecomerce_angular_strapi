import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMainCategory, IUser } from 'src/app/core/interface';
import { AuthService, MainCategoryService, StorageService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, Subject, map, pipe, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit ,OnDestroy{
  unsubscribe$=new Subject()
  constructor(
    private authservice:AuthService,
    private storageservice:StorageService,
    private mainCategoryservice:MainCategoryService
  ) {
    
  }
   
  user:Observable<IUser|null>=this.authservice.user$
  profilUrl:Observable<string|null>= this.authservice.profilUrl$
  apiHost:string=environment.appHost
  search:string=''

  mainCategories:IMainCategory[]=[]

  allCategories:Subject<string[]>=new Subject();
 

  width:number=1;
  cartCount:number=11

  ngOnInit(): void {    
    this.width=Math.floor(100/this.mainCategories.length)
    this.mainCategoryservice.getAll('?populate=*')
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next:(res)=>{this.mainCategories=res},
      error:(error)=>console.log(error)
    })
                               
    }
  signOut():void{
    this.authservice.signOut()    
  }

 
  
  
  ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
  }
  

}
