import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild, asNativeElements } from '@angular/core';
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
export class HeaderComponent implements OnInit, AfterViewInit,OnDestroy{

@ViewChild('lowerHeader') lowerHeader?:ElementRef

  unsubscribe$=new Subject()
  constructor(
    private authservice:AuthService,
    private storageservice:StorageService,
    private mainCategoryservice:MainCategoryService,
    private router:Router,
    private ngZone:NgZone
  ) {}
 
   
  
  user:Observable<IUser|null>=this.authservice.user$
  profilUrl:Observable<string|null>= this.authservice.profilUrl$
  role:Observable<string|null>=this.authservice.role$
  apiHost:string=environment.appHost
  search:string=''

  mainCategories:IMainCategory[]=[]

  allCategories:Subject<string[]>=new Subject();
  

  width:number=1;
  cartCount:number=11

  ngOnInit(): void {  
    this.showChildren();
    this.mainCategoryservice.getAll('?populate=*')
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next:(res)=>{
        this.mainCategories=res;        
        this.width=Math.floor(100/(this.mainCategories.length+1))
      },
      error:(error)=>console.log(error)
    })
  }

    
    ngAfterViewInit(): void {
     this.ngZone.runOutsideAngular(()=>this.clickableMenuLinks())     
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

                               
  signOut():void{
    this.authservice.signOut();
    this.router.navigate([''])  
  }





  control:boolean=true;
  showChildren(){    
     
  
   }
    

  
 
  
  
  ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
  }
  

}
