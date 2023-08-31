import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/core/interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

@Input() paginationInfo!:Observable<IPagination>;
@Output() wantedPage=new EventEmitter()
@Output() itemsPrePage=new EventEmitter()

 public activPage: number=1
 public pages:number[]=[1] 
 public pageSize:number=1
 public pageSizeOption:Number[]=[1,10,50,100]

  ngOnInit(): void {
    this.paginationInfo.subscribe({
      next:(data:IPagination)=>{
        this.activPage=data.pagination.page
        this.pages=Array(data.pagination.pageCount).fill(0).map((x,i)=>i+1)
        this.pageSize=data.pagination.pageSize
      }
    })
  }

  changePage(page: number): void {
    if(page>0 && page<=this.pages.length){
      this.activPage = page;
      this.wantedPage.emit(page)
    }
  }

  setItemPrePage(el:EventTarget| null):void{
    if(el) this.itemsPrePage.emit(+(el as HTMLSelectElement).value);  
  }

}
