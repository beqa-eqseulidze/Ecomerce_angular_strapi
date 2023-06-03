import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { IMainCategory, IOneLevelSubCategory, ITwoLevelSubCategory } from 'src/app/core/interface';
import { MainCategoryService } from 'src/app/core/services/main-category.service';
import { OneLevelSubCategoriesLinksComponent } from 'src/app/share/oneLevelSubCategoriesLinks/oneLevelSubCategoriesLinks.component';
import { OneLevelSubCategoryService } from 'src/app/core/services/one-level-sub-category.service';
import { TwoLevelSubCategoryService } from 'src/app/core/services/two-level-sub-category.service';


@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit, OnDestroy {

  constructor(
    private route:ActivatedRoute,
    private mainCategoryService:MainCategoryService,
    private oneLevelSubCategoryService:OneLevelSubCategoryService,
    private twoLevelSubCategoryService:TwoLevelSubCategoryService
  ) { 
     this.getAllCategories();    
  }

  unsubscribe$=new Subject()
  data:IMainCategory[]|IOneLevelSubCategory[]|ITwoLevelSubCategory[]=[]
  categoryType:string=''
   
  ngOnInit(): void {   

    this.route.params
    .subscribe(res=>{
      this.categoryType=res['categoryType']  
      switch(this.categoryType){
       case 'main_categories':
         this.mainCategoryService.entries$.pipe(takeUntil(this.unsubscribe$)).subscribe(d=>this.data=d)      
         break;      
       case 'one_level_sub_categories':      
         this.oneLevelSubCategoryService.entries$.pipe(takeUntil(this.unsubscribe$)).subscribe(d=>this.data=d)
         break;
       case 'two_level_sub_categories':
         this.twoLevelSubCategoryService.entries$.pipe(takeUntil(this.unsubscribe$)).subscribe(d=>this.data=d)
         break;
      }
     })
   
  }

  // get all categories entries and save in subject
  getAllCategories():void{   
    if( !this.oneLevelSubCategoryService.entries$.getValue().length){
      this.oneLevelSubCategoryService.getAll("?populate=*")
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((d:IOneLevelSubCategory[])=>this.oneLevelSubCategoryService.entries$.next(d))
      }
      
      if( !this.twoLevelSubCategoryService.entries$.getValue().length){
        this.twoLevelSubCategoryService.getAll("?populate=*")
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((d:ITwoLevelSubCategory[])=>this.twoLevelSubCategoryService.entries$.next(d))
      }
 }
   
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
  
}
 