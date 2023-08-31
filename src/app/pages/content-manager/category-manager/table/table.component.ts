import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

import { ITwoLevelSubCategory ,IOneLevelSubCategory,IMainCategory} from 'src/app/core/interface';
import { MainCategoryService,TwoLevelSubCategoryService ,OneLevelSubCategoryService} from 'src/app/core/services';


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
  @Input() categoryType?:string='';
  @Output() deleteId=new EventEmitter<number>();

  private unsubscribe$=new Subject();
  constructor(
    public mainCategoryService:MainCategoryService,
    public oneLevelSubCategoryService:OneLevelSubCategoryService,
    public twoLevelSubCategoryService:TwoLevelSubCategoryService
  ) { }

  ngOnInit(): void {

  }

 delete(id:number):void{
  this.deleteId.emit(id);   
 }


ngOnDestroy(): void {
  this.unsubscribe$.next(null);
  this.unsubscribe$.complete();
}

}
