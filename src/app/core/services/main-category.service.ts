import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/core/services';
import { IMainCategoryCreate,IMainCategory} from "src/app/core/interface";;
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainCategoryService extends BaseService<IMainCategoryCreate,IMainCategory> {
      override tbName: string='main-categories'  
    
      entries$:BehaviorSubject<any>=new BehaviorSubject([])
    }

