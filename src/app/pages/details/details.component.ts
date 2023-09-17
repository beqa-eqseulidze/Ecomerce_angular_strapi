import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { IProduct, IProducts } from 'src/app/core/interface';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {

  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService
  ) { }
    private $unsubscribe=new Subject()

    public product?:IProduct
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      takeUntil(this.$unsubscribe),
      map(params=>params['id']),
      switchMap((id:number)=>this.productService.getById(id,'?populate=image')),
      map((data:any):IProduct=>data)     
    )
    .subscribe({
      next:product=>this.product=product,
      error:error=>console.log(error)
    })
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next(null);
    this.$unsubscribe.complete();  
    
  }

}
