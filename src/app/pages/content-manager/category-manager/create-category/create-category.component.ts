import { AfterContentInit, Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MainCategoryService } from '../../../../core/services/main-category.service';
import { OneLevelSubCategoryService } from '../../../../core/services/one-level-sub-category.service';
import { TwoLevelSubCategoryService } from '../../../../core/services/two-level-sub-category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { IMainCategory, IMainCategoryCreate, IOneLevelSubCategory, ITwoLevelSubCategory } from 'src/app/core/interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit,OnDestroy{

  constructor(
    private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private mainCategoryService:MainCategoryService,
    private oneLevelSubCategoryService:OneLevelSubCategoryService,
    private twoLevelSubCategoryService:TwoLevelSubCategoryService
    ) { }
    unsubscribe$=new Subject()
    categoryType:string=''
    categories$?:Observable<IMainCategory[]|IOneLevelSubCategory[]>
    errorText?:string

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(d=>{
        this.categoryType=d['categoryType'];
        switch(this.categoryType){        
          case 'one_level_sub_categories':         
            this.categories$=this.mainCategoryService.entries$
            break;
          case 'two_level_sub_categories':
            this.categories$=this.oneLevelSubCategoryService.entries$
            break;
        }
      
      })
    }



  form:FormGroup=new FormGroup({
    title:new FormControl('',[Validators.required]),
    parent:new FormControl('')
    })
  
  submit() {    
    this.form.markAllAsTouched();
    if(this.form.invalid){
      this.errorText='fill in form correctly';
      return
    }   
    if(this.categoryType!=='main_categories'&&this.form.controls['parent'].value==''){
      this.errorText='choose parent categores'
      return
    }  
    // call properly service 
    let body
    let title=this.form.controls['title'].value.trim()
    let parent=this.form.controls['parent'].value

    switch(this.categoryType){ 
      // this  blok of this code works then create 'min_categories' entry 
      case 'main_categories':
      body={data:{title}}
        this.mainCategoryService.create(body).pipe(takeUntil(this.unsubscribe$))
        .subscribe(
                    {
                      next:(d:any)=>{
                      this.mainCategoryService.entries$.next([...this.mainCategoryService.entries$.getValue(),d])
                        this.GoToBack()
                      },
                      error:(error:any)=>{
                        this.errorText=error.error.error.message
                      }                      
                    }
                  )
      break;
      // this  pice of this code works then creates 'one_level_sub_categories' entry 
      case 'one_level_sub_categories':      
       body={
              data:{
                title:title,
                main_categories:parent
              }
            }   
       this.oneLevelSubCategoryService.create(body)
       .pipe(
        takeUntil(this.unsubscribe$),
        // get recently created category's parent category
        switchMap((cat:IOneLevelSubCategory)=>{
          return this.oneLevelSubCategoryService.getById(cat.id,'?populate=main_categories')
        })
        )
       .subscribe(
                  {
                    next:(cat:IOneLevelSubCategory)=>{
                      this.oneLevelSubCategoryService.entries$.next([...this.oneLevelSubCategoryService.entries$.getValue(),cat])
                      this.GoToBack()
                    },
                    error:(error:any)=>{
                      this.errorText=error.error.error.message
                    }      
                   
                  }
                )
        break;
      // this  pice of this code works then creates 'two_level_sub_categories' entry 
      case 'two_level_sub_categories':
        body={
          data:{
            title:title ,
            one_level_sub_categories:parent
          }
        }   
        this.twoLevelSubCategoryService.create(body)
        .pipe(
          takeUntil(this.unsubscribe$),
         // get recently created category's parent category
          switchMap((cat:ITwoLevelSubCategory)=>{
            return this.twoLevelSubCategoryService.getById(cat.id,'?populate=one_level_sub_categories')
          })
          )
        .subscribe(
                    {
                      next:(cat:ITwoLevelSubCategory)=>{
                        this.twoLevelSubCategoryService.entries$.next([...this.twoLevelSubCategoryService.entries$.getValue(),cat])
                        this.GoToBack()
                      },
                      error:(error:any)=>{
                        this.errorText=error.error.error.message                       
                      }                     
                    }
                )
        break;
    }
    
  }
    
  
  // back to category manager page
  GoToBack():void{
    let url=this.router.url.split('/').slice(0,length-1).join('/')
    this.router.navigate([url])
  }

ngOnDestroy(): void {
  this.unsubscribe$.next(null)
  this.unsubscribe$.complete()
}

}
