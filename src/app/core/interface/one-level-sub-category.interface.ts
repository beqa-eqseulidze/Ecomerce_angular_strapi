import { IMainCategory } from "./main-category.interface"
import { ITwoLevelSubCategory } from "./two-level-sub-category.interface"

export interface IOneLevelSubCategoryCreate{
    data: {
      title:string,
      main_categories:number[]|number ////it gets id of main_categories     
    }
  }

export interface IOneLevelSubCategory{
            id: number
            attributes: {
                    title: string
                    createdAt: string
                    updatedAt: string
                    publishedAt: string
                    main_categories?:{data:IMainCategory[]}
                    two_level_sub_categories?:{data:ITwoLevelSubCategory[]}
                }
        }
