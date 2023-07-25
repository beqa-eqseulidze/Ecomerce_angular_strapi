import { Injectable } from '@angular/core';
import { IAuthResponse, IUser, IUserRole } from '../interface/user.interface';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(

  ) { }

  saveResponce(param: IAuthResponse) {
    localStorage.setItem('appAuthResponce', JSON.stringify(param));
  }

  get user(): IUser | null {
    let res!: IAuthResponse
    const data = localStorage.getItem('appAuthResponce')
    data ? res = JSON.parse(data) : null;
    return res ? res.user : null
  }


  get Token(): string | null {
    let res!: IAuthResponse
    const data = localStorage.getItem('appAuthResponce')
    data ? res = JSON.parse(data) : null;
    return res ? res.jwt : null
  }

  saveProfilImageUrl(profilUrl: string) {
    localStorage.setItem('appProfilUrl', profilUrl);
  }

  get profilUrl(): string | null {
    return localStorage.getItem('appProfilUrl')
  }

  saveRole(role: IUserRole) {
    localStorage.setItem('appUserRole', JSON.stringify(role));
  }

  get Role(): string | null {
    const role = localStorage.getItem('appUserRole');
    return role ? JSON.parse(role).name : null;
  }



}
