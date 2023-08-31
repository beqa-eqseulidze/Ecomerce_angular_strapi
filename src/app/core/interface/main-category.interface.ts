import { IOneLevelSubCategory } from "./one-level-sub-category.interface"

export interface IMainCategoryCreate{
        data:{
                title:string
                }    
        }

export interface IMainCategory{
            id: number
            attributes: {
                    title: string
                    createdAt: string
                    updatedAt: string
                    publishedAt: string
                    one_level_sub_categories?:{data:IOneLevelSubCategory[]}
                }
        }


  

  

