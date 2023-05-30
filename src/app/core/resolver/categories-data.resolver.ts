import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MainCategoryService,OneLevelSubCategoryService, TwoLevelSubCategoryService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataResolver implements Resolve<boolean> {
  constructor(
    private mainCategoryService:MainCategoryService,
    private oneLevelSubCategoryService:OneLevelSubCategoryService,
    private twoLevelSubCategoryService:TwoLevelSubCategoryService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // get all categories entries and save in subject
  
    return of(true);
  }


}
