import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/core/services';
import { IMainCategoryCreate,IMainCategory} from "src/app/core/interface";;
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MainCategoryService extends BaseService<IMainCategoryCreate,IMainCategory> {
      override tbName: string='main-categories'       
      entries$=new BehaviorSubject<IMainCategory[]>([]);
      menuEntries$=new BehaviorSubject<IMainCategory[]>([]);   

  }

