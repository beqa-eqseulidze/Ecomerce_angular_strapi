import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

import { ITwoLevelSubCategory, ITwoLevelSubCategoryCreate } from "src/app/core/interface";

@Injectable({providedIn:'root'})
export class TwoLevelSubCategoryService extends BaseService<ITwoLevelSubCategoryCreate,ITwoLevelSubCategory>{
    override tbName: string='two-level-sub-categories'
}