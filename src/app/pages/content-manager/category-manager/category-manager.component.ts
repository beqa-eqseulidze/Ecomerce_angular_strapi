import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, tap, BehaviorSubject, map } from 'rxjs';
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

  // get all categories entries and save in state (in BehaviorSubject)
  getAllCategories():void{   
    // "main_categories" entries already exists in state(from heder.component) that's why don't need to get it agin 
    if( !this.oneLevelSubCategoryService.entries$.getValue().length){
      this.oneLevelSubCategoryService.getEntries("?populate=*")
        .pipe(
          takeUntil(this.unsubscribe$),
          map((d:any)=>d.data)
          )
        .subscribe((d:IOneLevelSubCategory[])=>this.oneLevelSubCategoryService.entries$.next(d))
      }
      
      if( !this.twoLevelSubCategoryService.entries$.getValue().length){
        this.twoLevelSubCategoryService.getEntries("?populate=*")
      .pipe(
        takeUntil(this.unsubscribe$),
        map((d:any)=>d.data)        
        )
      .subscribe((d:ITwoLevelSubCategory[])=>this.twoLevelSubCategoryService.entries$.next(d))
      }
 }
 
 delete(id:number):void{
  if(confirm('this entry will be deleted, are you shure'))
   switch(this.categoryType){
      case "main_categories":
        this.mainCategoryService.delete(id)
        .pipe(takeUntil(this.unsubscribe$) )
        .subscribe({
          next:(d)=>{
            let categories=this.mainCategoryService.entries$.getValue(); 
            let index=categories.findIndex((item:IMainCategory)=>item.id===d.id)
            categories.splice(index,1)
            this.mainCategoryService.entries$.next(categories)
            setTimeout(()=>{alert("Deleted successfully")},500)
          }
        })
        break

      case "one_level_sub_categories":
        this.oneLevelSubCategoryService.delete(id)
        .pipe(takeUntil(this.unsubscribe$) )
        .subscribe({
          next:(d)=>{
            let categories=this.oneLevelSubCategoryService.entries$.getValue(); 
            let index=categories.findIndex((item:IOneLevelSubCategory)=>item.id===d.id)
            categories.splice(index,1)
            this.oneLevelSubCategoryService.entries$.next(categories)
            setTimeout(()=>{alert("Deleted successfully")},500)
          }
        })
        break

      case "two_level_sub_categories":
        this.twoLevelSubCategoryService.delete(id)
        .pipe(takeUntil(this.unsubscribe$) )
        .subscribe({
          next:(d)=>{          
              let categories=this.twoLevelSubCategoryService.entries$.getValue(); 
              let index=categories.findIndex((item:ITwoLevelSubCategory)=>item.id===id)       
              categories.splice(index,1)
              this.twoLevelSubCategoryService.entries$.next(categories)        
             setTimeout(()=>{alert("Deleted successfully")},500)
          }
        })
        break   
    }
 }
   
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
  
}
 