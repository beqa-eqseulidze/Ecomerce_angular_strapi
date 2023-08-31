import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map, tap } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()

// generic C-ICreate; 
// generic R-IResponse;
export class BaseService<C,R> {
  url:string=environment.apiUrl
  tbName:string=''

  constructor(
    public http:HttpClient,
    private loaderService:LoaderService
  ) { }
// if don't need to loader set needLoeader to false, default it is true;
  getEntries(queryParam:string='',needLoeader:boolean=true):Observable<R>{
    needLoeader&&this.loaderService.loaderOn()
    return this.http.get<R>(this.url+this.tbName+queryParam)
    .pipe(
      // map((d:any)=>d.data),
      tap(()=>this.loaderService.loaderOff())
      )
  }

  getById(id:number,queryParam:string=''):Observable<R>{
    return this.http.get<R>(this.url+this.tbName+'/'+id+queryParam).pipe(map((d:any)=>d.data))
  }

// create() allow only admin users
  create(body:C):Observable<R>{
    return this.http.post<R>(this.url+this.tbName,body).pipe(map((d:any)=>d.data))
  }

// update() allow only admin users  
  update(id:number, body:C):Observable<R>{
  return this.http.put<R>(this.url+this.tbName+'/'+id,body).pipe(map((d:any)=>d.data))
}

// delete() allow only admin users  
  delete(id:number):Observable<R>{
    return this.http.delete<R>(this.url+this.tbName+'/'+id)
  }
// search   allow all users
  filter(queryParams:string):Observable<R>{
    return this.http.get<R>(this.url+this.tbName+queryParams)
  }




}
