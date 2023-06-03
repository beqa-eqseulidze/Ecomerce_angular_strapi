import { IMainCategory } from "./main-category.interface"
import { IOneLevelSubCategory } from "./one-level-sub-category.interface"

export interface ITwoLevelSubCategoryCreate{
    data: {
      title:string,
      one_level_sub_categories:number[]|number // it gets id of two_level_sub_categories
    }    
  }

export interface ITwoLevelSubCategory{
            id: number
            attributes: {
                    title: string
                    createdAt: string
                    updatedAt: string
                    publishedAt: string
                    one_level_sub_categories?:{data:IOneLevelSubCategory[]}
                    

                }
        }
