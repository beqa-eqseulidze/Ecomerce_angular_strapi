export interface IPagination{
    pagination:{
        page: number      // page number that we want
        pageSize: number // how many items we want for each page 
        pageCount: number // how many pages are all 
        total: number     // how many item are all 
    }
}