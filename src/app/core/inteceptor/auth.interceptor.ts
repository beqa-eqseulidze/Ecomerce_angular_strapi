import { Injectable } from '@angular/core';
import { HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services';
import { StorageService } from '../services/storage.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService,
    private storageService:StorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.storageService.Token;

    if(token){
      request = request.clone({
        headers: request.headers.set('Authorization', 'bearer '+token)
      });
    }
    
       return next.handle(request);
     };
  }

