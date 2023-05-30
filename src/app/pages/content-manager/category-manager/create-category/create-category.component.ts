import { AfterContentInit, Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MainCategoryService } from '../../../../core/services/main-category.service';
import { OneLevelSubCategoryService } from '../../../../core/services/one-level-sub-category.service';
import { TwoLevelSubCategoryService } from '../../../../core/services/two-level-sub-category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit,AfterViewInit {

  categoryType:string='';

  constructor(
    private route:ActivatedRoute,
    private mainCategoryService:MainCategoryService,
    private oneLevelSubCategoryService:OneLevelSubCategoryService,
    private twoLevelSubCategoryService:TwoLevelSubCategoryService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(d=>{
      this.categoryType=d['categoryType'];
      switch(this.categoryType){
        case 'main_categories':
          // some code
          break;
        case 'one_level_sub_categories':
          // some code
          break;
        case 'two_level_sub_categories':
          // some code 
          break;
      }
    
    })
  }

  ngAfterViewInit():void{
    console.log(this.categoryType)
  }

  form:FormGroup=new FormGroup({
    title:new FormControl('',[Validators.required])
    })


  submit() {
    throw new Error('Method not implemented.');
    }
}
