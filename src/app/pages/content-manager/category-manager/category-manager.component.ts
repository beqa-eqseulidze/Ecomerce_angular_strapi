import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { IMainCategory, IOneLevelSubCategory, ITwoLevelSubCategory } from 'src/app/core/interface';
import { MainCategoryService } from '../../../core/services/main-category.service';
import { OneLevelSubCategoriesLinksComponent } from '../../../share/oneLevelSubCategoriesLinks/oneLevelSubCategoriesLinks.component';
import { OneLevelSubCategoryService } from '../../../core/services/one-level-sub-category.service';
import { TwoLevelSubCategoryService } from '../../../core/services/two-level-sub-category.service';


@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private mainCategoryService:MainCategoryService,
    private oneLevelSubCategoryService:OneLevelSubCategoryService,
    private twoLevelSubCategoryService:TwoLevelSubCategoryService
  ) {}

  data:IMainCategory[]|IOneLevelSubCategory[]|ITwoLevelSubCategory[]=[]
  categoryType:string=''
   
  ngOnInit(): void {
    this.route.params.subscribe(res=>{
     this.categoryType=res['categoryType'];
     switch(this.categoryType){
      case 'main_categories':
        this.mainCategoryService.getAll('?populate=*').pipe(tap((d=>this.data=d))).subscribe()
        break;      
      case 'one_level_sub_categories':
        this.oneLevelSubCategoryService.getAll('?populate=*').pipe(tap((d=>this.data=d))).subscribe()
        break;
      case 'two_level_sub_categories':
        this.twoLevelSubCategoryService.getAll('?populate=*').pipe(tap((d=>this.data=d))).subscribe()
        break;
     }
    })  
   
  }

  
}
 