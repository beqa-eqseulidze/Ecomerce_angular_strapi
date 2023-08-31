import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, switchMap, takeUntil, tap, Observable } from 'rxjs';

import { IOneLevelSubCategory } from 'src/app/core/interface';
import { MainCategoryService ,OneLevelSubCategoryService,SearchService} from 'src/app/core/services';

@Component({
  selector: 'app-one-level-sub-category',
  templateUrl: './one-level-sub-category.component.html',
  styleUrls: ['../category-manager.component.scss']  
})
export class OneLevelSubCategoryComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private oneLevelSubCategoryService:OneLevelSubCategoryService,
    private searchService:SearchService
  ) {};

  private unsubscribe$=new Subject();
  public data: Observable<IOneLevelSubCategory[]>=this.oneLevelSubCategoryService.entries$;
  private searchText:string='';

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(      
      tap(params=>this.searchService.searchText.next(params['search']||'')),
      switchMap(d=>{
      let filter=''
      if(this.searchText!=='') filter=`filters[$or][0][title][$contains]=${this.searchText}&filters[$or][1][main_categories][title][$contains]=${this.searchText}&`
     const queryParams = `?${filter}populate=*`;
     return this.oneLevelSubCategoryService.getEntries(queryParams,false)
            .pipe(
              map((d:any):IOneLevelSubCategory[]=>d.data),
              tap(d=>this.oneLevelSubCategoryService.entries$.next(d))
            )
      }),
      takeUntil(this.unsubscribe$)
    )
    .subscribe();
    
    this.searchService.searchText
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(
          (text) =>{
            this.searchText = text;
            this.router.navigate(['content-manager/category-manager/one-level-sub-category'],{queryParams:{search:this.searchText,populate:'*'}})              
          }
          )
        )
      .subscribe();
  }

  delete(id: number): void {
    if (confirm('this entry will be deleted, are you shure'))
     this.oneLevelSubCategoryService
             .delete(id)
             .pipe(
               takeUntil(this.unsubscribe$),
               tap(()=>{
                 let newdata=this.oneLevelSubCategoryService.entries$.getValue().filter(item=>item.id!==id);
                 this.oneLevelSubCategoryService.entries$.next(newdata)
               })
               )
             .subscribe({
               next: (d) => {
                   setTimeout(() => {
                   alert('Deleted successfully');
                 }, 300);
               },
            });      
   }
    ngOnDestroy(): void {
      this.unsubscribe$.next(null);
      this.unsubscribe$.complete();
      this.searchService.searchText.next('');      
    }
}
