import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  Observable,
  Subject,
  takeUntil,
  tap,
  BehaviorSubject,
  map,
} from 'rxjs';
import {
  IMainCategory,
  IOneLevelSubCategory,
  ITwoLevelSubCategory,
} from 'src/app/core/interface';
import { MainCategoryService } from 'src/app/core/services/main-category.service';
import { OneLevelSubCategoriesLinksComponent } from 'src/app/share/oneLevelSubCategoriesLinks/oneLevelSubCategoriesLinks.component';
import { OneLevelSubCategoryService } from 'src/app/core/services/one-level-sub-category.service';
import { TwoLevelSubCategoryService } from 'src/app/core/services/two-level-sub-category.service';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
})
export class CategoryManagerComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private mainCategoryService: MainCategoryService,
    private oneLevelSubCategoryService: OneLevelSubCategoryService,
    private twoLevelSubCategoryService: TwoLevelSubCategoryService,
    private searchService: SearchService
  ) {
    // this.getAllCategories();
  }

  unsubscribe$ = new Subject();
  data: IMainCategory[] | IOneLevelSubCategory[] | ITwoLevelSubCategory[] = [];
  categoryType: string = '';
  searchText: string = '';

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((res) => {
    //   this.categoryType = res['categoryType'];
    //   switch (this.categoryType) {
    //     case 'main_categories':
    //       // this.mainCategoryService.entries$
    //       //   .pipe(takeUntil(this.unsubscribe$))
    //       //   .subscribe((d) => (this.data = d)); 
    //         this.mainCategoryService.getEntries()
    //         .pipe(
    //           takeUntil(this.unsubscribe$),
    //           map((d:any):IMainCategory[]=>d.data)
    //           )
    //         .subscribe((d) => (this.data = d));

    //         this.searchService.searchText
    //         .pipe(
    //           tap(
    //             (text) =>{
    //               this.searchText = text;
    //               this.router.navigate(['content-manager/category-manager/main_categories'],{queryParams:{search:this.searchText}})              
    //             }
    //             )
    //           )
    //         .subscribe();
    //       break;
    //     case 'one_level_sub_categories':
    //       // this.oneLevelSubCategoryService.entries$
    //       //   .pipe(takeUntil(this.unsubscribe$))
    //       //   .subscribe((d) => (this.data = d));
    //         this.oneLevelSubCategoryService.getEntries()
    //         .pipe(
    //           takeUntil(this.unsubscribe$),
    //           map((d:any):IOneLevelSubCategory[]=>d.data)
    //           )
    //         .subscribe((d) => (this.data = d));
    //       break;
    //     case 'two_level_sub_categories':
    //       // this.twoLevelSubCategoryService.entries$
    //       //   .pipe(takeUntil(this.unsubscribe$))
    //       //   .subscribe((d) => (this.data = d));
    //         this.twoLevelSubCategoryService.getEntries()
    //         .pipe(
    //           takeUntil(this.unsubscribe$),
    //           map((d:any):ITwoLevelSubCategory[]=>d.data)
    //           )
    //         .subscribe((d) => (this.data = d));
    //       break;
    //   }
    // });

    
  }
  
  // loadPage(search:string): void { 
  //   let filter=''
  //   if(search!=='') filter=`filters[$or][0][name][$contains]=${search}&filters[$or][2][description][$contains]=${search}&filters[$or][3][price][$contains]=${search}&filters[$or][4][parent][title][$contains]=${search}&`
  //    const queryParams = `?${filter}pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=parent&populate=image`;
  //   this.mainCategoryService
  //     .getEntries(queryParams,false)
  //     .pipe(
  //       takeUntil(this.unsubscribe$),
  //       tap((data: IProducts) => {
  //         this.productService.products$.next(data.data);
  //         this.products = this.productService.products$;
  //         let paginateInfo = data.meta;
  //         if (paginateInfo) this.paginate$.next(paginateInfo);
  //       })
  //     ).subscribe()
  //    ;
  // }
  // get all categories entries and save in state (in BehaviorSubject)
  // getAllCategories(): void {
  //   // "main_categories" entries already exists in state(from heder.component) that's why don't need to get it agin
  //   if (!this.oneLevelSubCategoryService.entries$.getValue().length) {
  //     this.oneLevelSubCategoryService
  //       .getEntries('?populate=*')
  //       .pipe(
  //         takeUntil(this.unsubscribe$),
  //         map((d: any) => d.data)
  //       )
  //       .subscribe((d: IOneLevelSubCategory[]) =>
  //         this.oneLevelSubCategoryService.entries$.next(d)
  //       );
  //   }

  //   if (!this.twoLevelSubCategoryService.entries$.getValue().length) {
  //     this.twoLevelSubCategoryService
  //       .getEntries('?populate=*')
  //       .pipe(
  //         takeUntil(this.unsubscribe$),
  //         map((d: any) => d.data)
  //       )
  //       .subscribe((d: ITwoLevelSubCategory[]) =>
  //         this.twoLevelSubCategoryService.entries$.next(d)
  //       );
  //   }
  // }

  delete(id: number): void {
  //   if (confirm('this entry will be deleted, are you shure'))
  //     switch (this.categoryType) {
  //       case 'main_categories':
  //         this.mainCategoryService
  //           .delete(id)
  //           .pipe(takeUntil(this.unsubscribe$))
  //           .subscribe({
  //             next: (d) => {
  //               let categories = this.mainCategoryService.entries$.getValue();
  //               let index = categories.findIndex(
  //                 (item: IMainCategory) => item.id === d.id
  //               );
  //               categories.splice(index, 1);
  //               this.mainCategoryService.entries$.next(categories);
  //               setTimeout(() => {
  //                 alert('Deleted successfully');
  //               }, 500);
  //             },
  //           });
  //         break;

  //       case 'one_level_sub_categories':
  //         this.oneLevelSubCategoryService
  //           .delete(id)
  //           .pipe(takeUntil(this.unsubscribe$))
  //           .subscribe({
  //             next: (d) => {
  //               let categories =
  //                 this.oneLevelSubCategoryService.entries$.getValue();
  //               let index = categories.findIndex(
  //                 (item: IOneLevelSubCategory) => item.id === d.id
  //               );
  //               categories.splice(index, 1);
  //               this.oneLevelSubCategoryService.entries$.next(categories);
  //               setTimeout(() => {
  //                 alert('Deleted successfully');
  //               }, 500);
  //             },
  //           });
  //         break;

  //       case 'two_level_sub_categories':
  //         this.twoLevelSubCategoryService
  //           .delete(id)
  //           .pipe(takeUntil(this.unsubscribe$))
  //           .subscribe({
  //             next: (d) => {
  //               let categories =
  //                 this.twoLevelSubCategoryService.entries$.getValue();
  //               let index = categories.findIndex(
  //                 (item: ITwoLevelSubCategory) => item.id === id
  //               );
  //               categories.splice(index, 1);
  //               this.twoLevelSubCategoryService.entries$.next(categories);
  //               setTimeout(() => {
  //                 alert('Deleted successfully');
  //               }, 500);
  //             },
  //           });
  //         break;
  //     }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
