import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainCategoryService, UserService ,AuthService} from 'src/app/core/services';

import { BehaviorSubject, Subject, catchError, combineLatestWith, map, takeUntil, tap } from 'rxjs';
import { IMainCategoryCreate, Iimage } from 'src/app/core/interface';
import { IOneLevelSubCategoryCreate } from 'src/app/core/interface/one-level-sub-category.interface';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { IProduct, IProducts } from '../../core/interface/product.interface';
import { environment } from 'src/environments/environment';

// interface IImage{
//   image: string,
//   thumbImage: string,
//   alt: string,
//   title: string,
//   order:number,
//   id:string
// }

interface ISliderImage{
    id:number
    title:string;
    imgUrl:string;
    alt?:string;
    price:number;
    oldPrice?:number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

 
  constructor(
    private http:HttpClient,
    private userService:UserService,
    private authService:AuthService,
    private mainCategoryService:MainCategoryService,
    private router:Router,
    private productService:ProductService
  ) { }
   private $unsubscribe=new Subject();
   public appHost=environment.appHost

  public productsForTopSlider: Array<ISliderImage> = []


  ngOnInit(): void { 
      this.getTopSliderProducts();    
  }

  getTopSliderProducts():void{
    const sliderImages:Array<ISliderImage>=[]
    const filter=`filters[inTopSlider][$eq]=${true}&populate=*`
      const queryParams:string = `?${filter}`;
      this.productService.getEntries(queryParams)
      .pipe(
        takeUntil(this.$unsubscribe),
        map((products:IProducts):IProduct[]=>products.data),
        tap((products:IProduct[])=>products.map((product:IProduct,index:number)=>{        
          const sliderImage:ISliderImage={
            id:product.id,    
            title: product.attributes.name,
            imgUrl: this.appHost+product.attributes.image?.data[0].attributes.formats.thumbnail.url || '',
            alt: product.attributes.image?.data[0].attributes.alternativeText||product.attributes.name|| '',
            price:product.attributes.price,
            oldPrice:product.attributes.oldPrice 
          };
          sliderImages.push(sliderImage);
        }))
        )      
        .subscribe({
          next:d=>{
            this.productsForTopSlider=[...sliderImages,...sliderImages]
          }
        });
}


  public goDetailsPage(id:number):void{
    console.log('id: '+ id);
    this.router.navigate(['details/'+id]);
  }
  ngOnDestroy(): void {
    this.$unsubscribe.next(null);
    this.$unsubscribe.complete();
    
  }

}
