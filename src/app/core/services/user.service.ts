import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthResponse, IRegister, ISignin, IUserAndRole, IUserRole , IFullImage} from 'src/app/core/interface';
import { Observable, tap } from 'rxjs';
import { StorageService,AuthService} from 'src/app/core/services';

interface IUserIRoleIFullImage extends IUserAndRole,IFullImage{}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string=environment.apiUrl;
  tbName:string='users';

  constructor(
    private http:HttpClient,
    private storageService:StorageService   
    ) { }

// getAndSaveOwnRoleAndProfilUrl allow autenticated and admin users to access:
   getAndSaveOwnRoleAndProfilUrl(token:string):Observable<IUserIRoleIFullImage>{    
       return this.http.get<IUserIRoleIFullImage>(this.url+this.tbName+'/me?populate=role&populate=image')
              .pipe(                              
                tap(responce=>this.storageService.saveRole(responce.role)),
                tap(responce=>{              
                  if(responce.image)
                  this.storageService.saveProfilImageUrl(responce.image.formats.thumbnail.url)
                }),
                )

   }

// getAndSaveOwnProfilUrl allow autenticated and admin users to access:
  getAndSaveOwnProfilUrl(token:string):Observable<IFullImage>{
    return this.http.get<IUserIRoleIFullImage>(this.url+this.tbName+'/me?populate=image')
           .pipe(             
             tap(responce=>{
              if(responce.image)
              this.storageService.saveProfilImageUrl(responce.image.formats.thumbnail.url)
            })
             )

}



//getAllUsersWithRole allow only admin users to access:
      getAllUsersWithRole():Observable<IAuthResponse[]>{
          return this.http.get<IAuthResponse[]>(this.url+this.tbName+'?populate=role')
      }

//getAllUsersWithRole() allow only admin users to access:
    getUserAndRole(userId:number):Observable<IAuthResponse>{
        return this.http.get<IAuthResponse>(this.url+this.tbName+'/'+userId+'?populate=role')
    }

// changeRole() allow only admin users to access:
    changeRole(userId:number,roleId:number):Observable<IUserAndRole>{
      const body={ "role":roleId}
      return this.http.put<IUserAndRole>(this.url+this.tbName+'/'+userId,body)
    }

// get all role what is posibility allow only admin users to access
    getRoles():Observable<IUserRole[]>{
      return this.http.get<IUserRole[]>(this.url+'users-permissions/roles')
    }

 }
