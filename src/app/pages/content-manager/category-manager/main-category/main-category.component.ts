import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { SearchService ,MainCategoryService} from 'src/app/core/services';
import { IMainCategory } from 'src/app/core/interface';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['../category-manager.component.scss'],
})
export class MainCategoryComponent implements OnInit,OnDestroy {
  oneLevelSubCategoryService: any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private mainCategoryService:MainCategoryService,
    private searchService:SearchService
  ) {};

  private unsubscribe$=new Subject();
  public data:Observable<IMainCategory[]>=this.mainCategoryService.entries$;
  private searchText:string='';

  ngOnInit(): void {   
    this.activatedRoute.queryParams
    .pipe(      
      tap(params=>this.searchService.searchText.next(params['search']||'')),
      takeUntil(this.unsubscribe$),
      switchMap(d=>{
      let filter=''
      if(this.searchText!=='') filter=`filters[$or][0][title][$contains]=${this.searchText}&`
     const queryParams = `?${filter}populate=*`;
     return this.mainCategoryService.getEntries(queryParams,false)
            .pipe(
              map((d:any):IMainCategory[]=>d.data),
              tap(d=>this.mainCategoryService.entries$.next(d))
            )
      })
    )
    .subscribe();
    
    // sbscribe change of searchText and change route
    this.searchService.searchText
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(
          (text) =>{
            this.searchText = text;
            this.router.navigate(['content-manager/category-manager/main-category'],{queryParams:{search:this.searchText,populate:'*'}})              
          }
          )
        )
      .subscribe();

  }

  delete(id: number): void {
     if (confirm('this entry will be deleted, are you shure'))
      this.mainCategoryService
              .delete(id)
              .pipe(
                takeUntil(this.unsubscribe$),
                tap(()=>{
                  let newdata=this.mainCategoryService.entries$.getValue().filter(item=>item.id!==id);
                  this.mainCategoryService.entries$.next(newdata);
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
