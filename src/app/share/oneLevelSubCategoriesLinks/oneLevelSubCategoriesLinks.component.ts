import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MainCategoryService } from '../../core/services/main-category.service';
import { IOneLevelSubCategory } from "src/app/core/interface/one-level-sub-category.interface";
import { Observable, Subject, map, takeUntil } from "rxjs";
import { IMainCategory } from "src/app/core/interface";
import { OneLevelSubCategoryService } from '../../core/services/one-level-sub-category.service';

@Component({
    selector:'app-one-level-sub-categories-link',
    templateUrl:'./oneLevelSubCategoriesLinks.component.html',
    styleUrls:['./oneLevelSubCategoriesLinks.component.scss']

})


export class OneLevelSubCategoriesLinksComponent implements OnInit,OnDestroy {
    unsubscribe$=new Subject()

    @Input() mainCategoryId !:number;

    constructor(
        private mainCategoryService:MainCategoryService,
        private oneLevelSubCategoryService:OneLevelSubCategoryService
    ){}

    oneLevelSubCategories:IOneLevelSubCategory[]=[]                                                     

    

ngOnInit(): void {
    if(!this.mainCategoryId) alert('no id')
    this.mainCategoryService.getById(this.mainCategoryId,'?populate=one_level_sub_categories')
    // .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
        next:(d:IMainCategory)=>{ this.oneLevelSubCategories=d.attributes.one_level_sub_categories?.data||[]}
    })
}

ngOnDestroy(): void {
    // this.unsubscribe$.next(null)
    // this.unsubscribe$.complete()
}

}