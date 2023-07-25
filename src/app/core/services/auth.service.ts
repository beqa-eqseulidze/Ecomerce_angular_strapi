import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthResponse, IRegister, ISignin, IUser, IUserIRoleIFullImage } from 'src/app/core/interface/user.interface';
import { BehaviorSubject, Observable, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  url: string = environment.apiUrl;
  endPointRegister: string = 'auth/local/register';
  endPointSignIn: string = 'auth/local';


  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private userService: UserService,
  ) { }

  // register new user the role will be 'authenticated'
  register(body: IRegister): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.url + this.endPointRegister, body)
      .pipe(      
        tap((resp: IAuthResponse) => {
          this.token$.next(resp.jwt);
          this.user$.next(resp.user);
          this.storageService.saveResponce(resp);
        }),
        // switchMap(() => {
        //   return this.userService.getAndSaveOwnRoleAndProfilUrl()
        //     .pipe(
        //       tap((d: IUserIRoleIFullImage) => {
        //         let userRole = d.role;
        //         this.role$.next(userRole.name)
        //         if (d.image) {
        //           let profilImageUrl = d.image[0].formats.thumbnail.url
        //           this.profilUrl$.next(profilImageUrl)
        //         }
        //       })
        //     )            
        // })
      )     
  }


  signIn(body: ISignin): Observable<IUserIRoleIFullImage> {
    return this.http.post<IAuthResponse>(this.url + this.endPointSignIn, body).pipe(
       tap((resp: IAuthResponse) => {
        this.token$.next(resp.jwt);
        this.user$.next(resp.user);
        this.storageService.saveResponce(resp);        
      }),
      switchMap(()=>{
        return this.userService.getAndSaveOwnRoleAndProfilUrl()
          .pipe(
            tap((d: IUserIRoleIFullImage) => {
              let userRole = d.role;
              this.role$.next(userRole.name)
              if (d.image) {
                let profilImageUrl = d.image[0].formats.thumbnail.url
                this.profilUrl$.next(profilImageUrl)
              }
            }))          
      })
    )
  }


  signOut() {
    localStorage.removeItem('appAuthResponce');
    localStorage.removeItem('appUserRole');
    localStorage.removeItem('appProfilUrl');
    this.role$.next(null);
    this.token$.next(null);
    this.user$.next(null);
    this.profilUrl$.next(null);

  }



  // this subjects value deppends on user is signd in or not  
  role$ = new BehaviorSubject<string | null>(this.storageService.Role);
  token$ = new BehaviorSubject<string | null>(this.storageService.Token);
  user$ = new BehaviorSubject<IUser | null>(this.storageService.user)
  profilUrl$ = new BehaviorSubject<string | null>(this.storageService.profilUrl)

}
