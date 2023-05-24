import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthResponse, IRegister, ISignin, IUser } from 'src/app/core/interface/user.interface';
import { BehaviorSubject, Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  url:string=environment.apiUrl;
  endPointRegister:string='auth/local/register';
  endPointSignIn:string='auth/local';


  constructor(
    private http:HttpClient,
    private storageService:StorageService,
    private userService:UserService,
    ) { }

    // this subject must be copmlpited after register or signin to usubscribe of this services subscribe
    unsubscribe$:Subject<any>=new Subject();

    // register new user the role will be 'authenticated'
   register(body:IRegister):Observable<IAuthResponse>{
    return this.http.post<IAuthResponse>(this.url+this.endPointRegister,body)
            .pipe(
                tap(resp=>this.token$.next(resp.jwt)),
                tap(resp=>this.user$.next(resp.user)),
                tap(resp=>this.storageService.saveResponce(resp)),
                tap(resp=>this.getAndSaveOwnRoleAndProfilUrl(resp))
                )
              }


   signIn(body:ISignin):Observable<IAuthResponse>{
    return this.http.post<IAuthResponse>(this.url+this.endPointSignIn,body).pipe(
              tap(resp=>this.token$.next(resp.jwt)),
              tap(resp=>this.user$.next(resp.user)),
              tap(resp=>this.storageService.saveResponce(resp)),
              tap(resp=>this.getAndSaveOwnRoleAndProfilUrl(resp))              
            )
   }

   getAndSaveOwnRoleAndProfilUrl(resp:IAuthResponse):void{
        this.userService.getAndSaveOwnRoleAndProfilUrl(resp.jwt)
        .pipe(
            tap(res=>{
            this.role$.next(res.role.name)
            if(res.image){                          
              this.profilUrl$.next(res.image.formats.thumbnail.url)
            }
          }),
           takeUntil(this.unsubscribe$)
        )
      .subscribe()

}

   signOut(){
          localStorage.removeItem('appAuthResponce');
          localStorage.removeItem('appUserRole');
          localStorage.removeItem('appProfilUrl');
          this.role$.next(null);
          this.token$.next(null);
          this.user$.next(null);
          this.profilUrl$.next(null);

   }



   // this subjects value deppends on user is signd in or not  
   role$:BehaviorSubject<string|null>=new BehaviorSubject(this.storageService.Role);
   token$:BehaviorSubject<string|null>=new BehaviorSubject(this.storageService.Token);
   user$:BehaviorSubject<IUser|null>=new BehaviorSubject(this.storageService.user)
   profilUrl$:BehaviorSubject<string|null>=new BehaviorSubject(this.storageService.profilUrl)
   
}
