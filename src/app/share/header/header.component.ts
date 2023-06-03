import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild, asNativeElements } from '@angular/core';
import { IMainCategory, IUser } from 'src/app/core/interface';
import { AuthService, MainCategoryService, StorageService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, Subject, combineLatest, map, pipe, takeUntil, tap, combineLatestWith } from 'rxjs';

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
    private ngZone:NgZone
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
      this.mainCategoryService.getAll('?populate=*')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next:(res)=>{
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
          let el=e.target as HTMLElement
          let hoverLinks:any[]=Array.from(this.lowerHeader?.nativeElement.children).filter((item:any)=>item.classList.contains('hoverlinks'))
          let index=hoverLinks.findIndex((item:any)=>item.classList.contains('show'))          
          if(el.classList.contains('nav-link')){
            if(index>=0){
               el.nextElementSibling?.classList.add('show')
               hoverLinks[index].classList.remove('show')
            }else{
               el.nextElementSibling?.classList.add('show')
            }
          }else{
            hoverLinks[index]?.classList.remove('show')
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

      .subscribe({
      
      })
    }
                               
  signOut():void{
    this.authservice.signOut();
    this.router.navigate([''])  
  }





  control:boolean=true;

    

  
 
  
  
  ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
  }
  

}
