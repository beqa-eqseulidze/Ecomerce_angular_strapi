import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services';
import {IMainCategoryCreate,IMainCategory} from 'src/app/core/interface'
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { IOneLevelSubCategory, IOneLevelSubCategoryCreate } from "src/app/core/interface";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OneLevelSubCategoryService extends BaseService<IOneLevelSubCategoryCreate,IOneLevelSubCategory> {
  override tbName: string='one-level-sub-categories'

  // savecategories():void{
  //   this.getAll().pipe(tap(res=>this.oneLevelSubCategories$.next(res)))
  // }
  entries$=new BehaviorSubject<IOneLevelSubCategory[]>([])
 }

