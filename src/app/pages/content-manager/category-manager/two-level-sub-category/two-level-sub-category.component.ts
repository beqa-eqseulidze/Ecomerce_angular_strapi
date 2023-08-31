import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, switchMap, takeUntil, tap, Observable } from 'rxjs';

import { IOneLevelSubCategory, ITwoLevelSubCategory } from 'src/app/core/interface';
import { TwoLevelSubCategoryService ,OneLevelSubCategoryService,SearchService} from 'src/app/core/services';

@Component({
  selector: 'app-two-level-sub-category',
  templateUrl: './two-level-sub-category.component.html',
  styleUrls: ['../category-manager.component.scss']
})
export class TwoLevelSubCategoryComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private oneLevelSubCategoryService:OneLevelSubCategoryService,
    private twoLevelSubCategoryService:TwoLevelSubCategoryService,
    private searchService:SearchService
  ) {};

  private unsubscribe$=new Subject();
  public data:Observable<ITwoLevelSubCategory[]>=this.twoLevelSubCategoryService.entries$;
  private searchText:string='';

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(      
      takeUntil(this.unsubscribe$),
      tap(params=>this.searchService.searchText.next(params['search']||'')),
      switchMap(d=>{
      let filter=''
      if(this.searchText!=='') filter=`filters[$or][0][title][$contains]=${this.searchText}&filters[$or][1][one_level_sub_categories][title][$contains]=${this.searchText}&`
     const queryParams = `?${filter}populate=*`;
     return this.twoLevelSubCategoryService.getEntries(queryParams,false)
            .pipe(
              map((d:any):ITwoLevelSubCategory[]=>d.data),
              tap(d=>this.twoLevelSubCategoryService.entries$.next(d))
            )
      })
    )    
    .subscribe();  

    // subscribe searchtext;
    this.searchService.searchText
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(
          (text) =>{
            this.searchText = text;
            this.router.navigate(['content-manager/category-manager/two-level-sub-category'],{queryParams:{search:this.searchText,populate:'*'}})              
          }
          )
        )
      .subscribe();

    
  }
    
  delete(id: number): void {
    if (confirm('this entry will be deleted, are you shure'))
     this.twoLevelSubCategoryService
             .delete(id)
             .pipe(
               takeUntil(this.unsubscribe$),
               tap(()=>{
                 let newdata=this.twoLevelSubCategoryService.entries$.getValue().filter(item=>item.id!==id);
                 this.twoLevelSubCategoryService.entries$.next(newdata)
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
