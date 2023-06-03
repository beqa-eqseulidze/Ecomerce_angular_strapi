import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainCategoryService, UserService ,AuthService} from 'src/app/core/services';

import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import { IMainCategoryCreate } from 'src/app/core/interface';
import { IOneLevelSubCategoryCreate } from 'src/app/core/interface/one-level-sub-category.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 
  constructor(
    private http:HttpClient,
    private userService:UserService,
    private authService:AuthService,
    private mainCategoryService:MainCategoryService
  ) { 
    
     }

  ngOnInit(): void {    
    // const token=this.authService.token$.getValue()
    // if(token){
    //   this.userService.getAndSaveOwnRole(token).subscribe({
    //     next:(res)=>console.log(res)
    //   })
    // }
    
    // const category:IOneLevelSubCategoryCreate={data:{title:'Mobile And Accessories'}}
    //this.mainCategoryService.create(category).subscribe(d=>console.log(d))
  }

}
