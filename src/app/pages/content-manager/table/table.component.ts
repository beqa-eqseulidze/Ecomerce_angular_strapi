import { Component, Input, OnInit } from '@angular/core';
import { IMainCategory } from '../../../core/interface/main-category.interface';
import { IOneLevelSubCategory } from '../../../core/interface/one-level-sub-category.interface';
import { ITwoLevelSubCategory } from 'src/app/core/interface';

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
export class TableComponent implements OnInit {

  @Input() data?:IMainCategory[]|IOneLevelSubCategory[]|ITwoLevelSubCategory[] ;
  @Input() categoryType?:string=''
  constructor(
    
  ) { }

  ngOnInit(): void {

  }
 delete(id:number):void{
    switch(this.categoryType){
      case "main_categories":

    }
 }


}
