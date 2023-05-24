import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { OneLevelSubCategoryService, TwoLevelSubCategoryService } from 'src/app/core/services';
import { IOneLevelSubCategory, ITwoLevelSubCategory } from "src/app/core/interface";

@Component({
    selector:'app-two-level-sub-categories-link',
    templateUrl:'./twoLevelSubCategoriesLinks.component.html',
    styleUrls:['./twoLevelSubCategoriesLinks.component.scss']

})


export class TwoLevelSubCategoriesLinksComponent implements OnInit,OnDestroy{
    unsubscribe$=new Subject()
    @Input() oneLevelSubCategoryId !:number

    constructor(
         private oneLevelSubCategoryService:OneLevelSubCategoryService
    ){}

     twoLevelSubCategories:ITwoLevelSubCategory[]=[]
                                                         

    

ngOnInit(): void {   
    this.oneLevelSubCategoryService.getById(this.oneLevelSubCategoryId,'?populate=two_level_sub_categories')
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
        next:(d:IOneLevelSubCategory)=>{          
            this.twoLevelSubCategories=d.attributes.two_level_sub_categories?.data||[]           
        }
    })
}

ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
}


}