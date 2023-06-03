import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable()

// generic C-ICreate; 
// generic R-IResponse;
export class BaseService<C,R> {
  url:string=environment.apiUrl
  tbName:string=''

  constructor(
    private http:HttpClient
  ) { }

  getAll(queryParam:string=''):Observable<R[]>{
    return this.http.get<R>(this.url+this.tbName+queryParam).pipe(map((d:any)=>d.data))
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
  return this.http.put<R>(this.url+this.tbName+'/'+id,body)
}

// delete() allow only admin users  
  delete(id:number):Observable<R>{
    return this.http.delete<R>(this.url+this.tbName+'/'+id)
  }
  test:any=''



}
