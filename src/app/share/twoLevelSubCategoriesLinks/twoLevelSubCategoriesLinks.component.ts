import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector:'app-two-level-sub-categories-link',
    templateUrl:'./twoLevelSubCategoriesLinks.component.html',
    styleUrls:['./twoLevelSubCategoriesLinks.component.scss']

})


export class TwoLevelSubCategoriesLinksComponent implements OnInit,OnDestroy{
    unsubscribe$=new Subject()
    @Input() oneLevelSubCategoryId !:number

    constructor(
        // private mainCategoryService:MainCategoryService
    ){}

    // oneLevelSubCategories:IOneLevelSubCategory[]=[]
                                                         

    

ngOnInit(): void {
    // if(!this.mainCategoryId) alert('no id')
    // this.mainCategoryService.getById(this.mainCategoryId,'?populate=*')
    // .pipe(takeUntil(this.unsubscribe$))
    // .subscribe({
    //     next:(d:IMainCategoryPopulateAll)=>{          
    //         this.oneLevelSubCategories=d.attributes.one_level_sub_categories.data
    //         console.log(this.oneLevelSubCategories)
    //     }
    // })
}

ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
}


}