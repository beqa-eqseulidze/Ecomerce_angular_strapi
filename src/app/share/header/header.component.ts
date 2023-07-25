import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, asNativeElements } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, combineLatest, map, pipe, takeUntil, tap, combineLatestWith } from 'rxjs';

import { IMainCategory, IUser } from 'src/app/core/interface';
import { environment } from 'src/environments/environment';
import { AuthService, MainCategoryService, StorageService,LoaderService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit,OnDestroy{

@ViewChild('lowerHeader') lowerHeader?:ElementRef

  unsubscribe$=new Subject()
  constructor(
    public authservice:AuthService,
    private storageservice:StorageService,
    public mainCategoryService:MainCategoryService,
    private router:Router,
    private ngZone:NgZone,
    private loaderService:LoaderService
  ) {}
 
   
  
  user:Observable<IUser|null>=this.authservice.user$
  role$:Observable<string|null>=this.authservice.role$
  profilUrl:Observable<string|null>= this.authservice.profilUrl$  
  apiHost:string=environment.appHost
  search:string=''
  width:number=0;
  cartCount:number=11


  ngOnInit(): void { 
    if(!this.mainCategoryService.entries$.getValue().length){
      this.mainCategoryService.getEntries('?populate=*')
      .pipe(
        takeUntil(this.unsubscribe$),
        map((d:any):IMainCategory[]=>d.data)
        )
      .subscribe({
        next:(res:IMainCategory[])=>{
          this.mainCategoryService.entries$.next(res)      
        },
        error:(error)=>console.error(error)
      })
    }   
  }
  
 
    ngAfterViewInit(): void {
      // clickeble menu event listener go out from angular change detection
     this.ngZone.runOutsideAngular(()=>this.clickableMenuLinks())
    //  menu links  set width
      this.setWidth()
    }
  
    // this function must be work outside of angular 
    clickableMenuLinks():void{    
        document.addEventListener('click',(e)=>{
          let el=e.target as HTMLElement;         
          let hoverLinks:any[]=Array.from(this.lowerHeader?.nativeElement.querySelectorAll('.hoverlinks'))
          let index=hoverLinks.findIndex((item:any)=>item.classList.contains('show'))     
          let navLinks:any[]=Array.from(this.lowerHeader?.nativeElement.querySelectorAll('.nav-link'))   
          let index2=navLinks.findIndex((item:any)=>item.classList.contains('active'))
          if(el.classList.contains('nav-link')){
              if(index2>=0){
                el.classList.add('active')          
                navLinks[index2]?.classList.remove('active')
              }
              else{
                el.classList.add('active')
              }                  
              if(index>=0){    
                el.nextElementSibling?.classList.add('show')
                hoverLinks[index]?.classList.remove('show')
              }
              else{
                el.nextElementSibling?.classList.add('show')               
              }
          }else{
            hoverLinks[index]?.classList.remove('show')
            navLinks[index2]?.classList.remove('active')
          }
        })    
    }

    setWidth():void{
      this.authservice.role$
      .pipe(
        combineLatestWith(this.mainCategoryService.entries$),
        map(([role,categories])=>{
          if(role==='admin'){
            this.width=Math.floor(100/(this.mainCategoryService.entries$.getValue().length+1));
          }else{
            this.width=Math.floor(100/this.mainCategoryService.entries$.getValue().length)
          }
        })
        )
      .subscribe()
    }
                               
  signOut():void{
    this.authservice.signOut();
    this.router.navigate([''])  
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
  } 
  

}
