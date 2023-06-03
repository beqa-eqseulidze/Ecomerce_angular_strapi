import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ITwoLevelSubCategory ,IOneLevelSubCategory,IMainCategory} from 'src/app/core/interface';
import { TwoLevelSubCategoryService ,OneLevelSubCategoryService} from 'src/app/core/services';
import { MainCategoryService } from '../../../../core/services/main-category.service';
import { Subject, takeUntil, tap } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy{

  @Input() data?:any //IMainCategory[]|ITwoLevelSubCategory[]|IOneLevelSubCategory[];
  @Input() categoryType?:string=''

  private unsubscribe$=new Subject()
  constructor(
    public mainCategoryService:MainCategoryService,
    public oneLevelSubCategoryService:OneLevelSubCategoryService,
    public twoLevelSubCategoryService:TwoLevelSubCategoryService
  ) { }

  ngOnInit(): void {

  }
 delete(id:number):void{
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
            alert("Deleted successfully")
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
            alert("Deleted successfully")
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
             alert("Deleted successfully")
          }
        })
        break   
    }
 }


ngOnDestroy(): void {
  this.unsubscribe$.next(null)
  this.unsubscribe$.complete();
}

}
