import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
     
  private loader=new BehaviorSubject<boolean>(true)  
   
   public loader$=this.loader.asObservable()
   
   public loaderOn():void{
      this.loader.next(true)
    }
    public loaderOff():void{
      setTimeout(()=>this.loader.next(false),500)      
    }
}
