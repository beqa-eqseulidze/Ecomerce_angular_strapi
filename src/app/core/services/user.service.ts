import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthResponse, IRegister, ISignin, IUserAndRole, IUserRole, IFullImage,IUserIRoleIFullImage} from 'src/app/core/interface';
import { Observable, tap } from 'rxjs';
import { StorageService, AuthService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = environment.apiUrl;
  tbName: string = 'users';

  constructor(
    private http: HttpClient,
    private storageService: StorageService   
  ) { }

  // getAndSaveOwnRoleAndProfilUrl allow autenticated and admin users to access:
  getAndSaveOwnRoleAndProfilUrl(): Observable<IUserIRoleIFullImage> {
    return this.http.get<IUserIRoleIFullImage>(this.url + this.tbName + '/me?populate=role&populate=image')
      .pipe(
        tap((response:IUserIRoleIFullImage) => {
          let userRole = response.role
          this.storageService.saveRole(userRole);        
          if (response.image) {
            let profilImageUrl = response.image[0].formats.thumbnail.url
            this.storageService.saveProfilImageUrl(profilImageUrl);         
          }
        })
      )
  }

  // // getAndSaveOwnProfilUrl allow autenticated and admin users to access:
  // getAndSaveOwnProfilUrl(): Observable<IFullImage> {
  //   return this.http.get<IUserIRoleIFullImage>(this.url + this.tbName + '/me?populate=image')
  //     .pipe(
  //       tap(response => {
  //         if (response.image)
  //           this.storageService.saveProfilImageUrl(response.image.attributes.formats.thumbnail.url)
  //       })
  //     )

  // }



  //getAllUsersWithRole allow only admin users to access:
  getAllUsersWithRole(): Observable<IAuthResponse[]> {
    return this.http.get<IAuthResponse[]>(this.url + this.tbName + '?populate=role')
  }

  //getAllUsersWithRole() allow only admin users to access:
  getUserAndRole(userId: number): Observable<IAuthResponse> {
    return this.http.get<IAuthResponse>(this.url + this.tbName + '/' + userId + '?populate=role')
  }

  // changeRole() allow only admin users to access:
  changeRole(userId: number, roleId: number): Observable<IUserAndRole> {
    const body = { "role": roleId }
    return this.http.put<IUserAndRole>(this.url + this.tbName + '/' + userId, body)
  }

  // get all role what is posibility allow only admin users to access
  getRoles(): Observable<IUserRole[]> {
    return this.http.get<IUserRole[]>(this.url + 'users-permissions/roles')
  }

}
