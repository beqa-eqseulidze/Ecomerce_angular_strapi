import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { IProduct } from 'src/app/core/interface';
import { ProductService } from '../../core/services/product.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {


  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private router:Router
  ) { }

    private $unsubscribe=new Subject();
    public product?:IProduct
    readonly appHost=environment.appHost
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
  goBack() {
    console.log(this.router.navigate(['../']));
    
    }
  ngOnDestroy(): void {
    this.$unsubscribe.next(null);
    this.$unsubscribe.complete();  
    
  }

}
