
import { IFullImage , ITwoLevelSubCategory , IPagination} from "./index"
import { Iimage } from './image.interface';


export interface IProducts{
    data: IProduct[],
    meta?: IPagination
}
export interface IProduct{
        id:number,
        attributes:{
            name: string
            description: string
            price: number
            quantity: number
            warranty?: string
            createdAt: string
            updatedAt: string
            publishedAt: string
            showHomePage:boolean
            showTopSlider:boolean
            image?: {
                data:Iimage[]
            },
            parent?:{
                data:ITwoLevelSubCategory
            }
        }
}
      
export interface IProductCreate{
   data:{
        name:string,
        description?:string,
        price:number,
        quantity:number,
        warranty?:string,
        parent:number       
        // showHomePage:boolean
        // showTopSlider:boolean
    }
}
