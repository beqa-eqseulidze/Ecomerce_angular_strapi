import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services';
import {IMainCategoryCreate,IMainCategory} from 'src/app/core/interface'
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { IOneLevelSubCategory, IOneLevelSubCategoryCreate } from '../interface/one-level-sub-category.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OneLevelSubCategoryService extends BaseService<IOneLevelSubCategoryCreate,IOneLevelSubCategory> {
  override tbName: string='one-level-sub-category'

  // savecategories():void{
  //   this.getAll().pipe(tap(res=>this.oneLevelSubCategories$.next(res)))
  // }
  // oneLevelSubCategories$:Subject<IOneLevelSubCategory[]>=new Subject()
 }

