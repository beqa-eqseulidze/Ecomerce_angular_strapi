import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainCategoryService, UserService ,AuthService} from 'src/app/core/services';

import { BehaviorSubject, Subject, combineLatestWith, map, takeUntil, tap } from 'rxjs';
import { IMainCategoryCreate, Iimage } from 'src/app/core/interface';
import { IOneLevelSubCategoryCreate } from 'src/app/core/interface/one-level-sub-category.interface';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { IProduct, IProducts } from '../../core/interface/product.interface';
import { environment } from 'src/environments/environment';
interface IImage{
  image: string,
  thumbImage: string,
  alt: string,
  title: string,
  order:number,
  id:string
}
interface ISliderImage{
    image: string,
    thumbImage: string,
    alt: string,
    title: string,
    order: number,
    id:number
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

  public imageObject: Array<ISliderImage> = [
//     {
//     image: 'assets/img/slider/1.jpg',
//     thumbImage: 'assets/img/slider/1_min.jpeg',
//     alt: 'alt of image',
//     title: ' image One',
//     order: 1,
//     id:1
//   },
//    {
//     image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//     thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//     title: 'Image Two', //Optional: You can use this key if want to show image with title
//     alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//     order: 1, //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
//     id:2
// },
// {
//   image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   title: 'Image Three', //Optional: You can use this key if want to show image with title
//   alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//   order: 1 ,//Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
//   id:3
// },
// {
//   image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   title: 'Image fore', //Optional: You can use this key if want to show image with title
//   alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//   order: 1 ,//Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
//   id:4
// },
// {
//   image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   title: 'Image fife', //Optional: You can use this key if want to show image with title
//   alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//   order: 1 ,//Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
//   id:5
// },
// {
//   image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   title: 'Image sex', //Optional: You can use this key if want to show image with title
//   alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//   order: 1, //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
//   id:6
// },
// {
//   image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   title: 'Image seven', //Optional: You can use this key if want to show image with title
//   alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//   order: 1 ,//Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
//   id:7
// },
// {
//   image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   title: 'Image eight', //Optional: You can use this key if want to show image with title
//   alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//   order: 1, //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
//   id:8
// },
// {
//   image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   title: 'Image nine', //Optional: You can use this key if want to show image with title
//   alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//   order: 1, //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
//   id:9
  
// },
// {
//   image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//   title: 'Image ten', //Optional: You can use this key if want to show image with title
//   alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//   order: 1, //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
//   id:10
// }
];


  ngOnInit(): void { 

  this.getTopSliderProducts();

    // const token=this.authService.token$.getValue()
    // if(token){
    //   this.userService.getAndSaveOwnRole(token).subscribe({
    //     next:(res)=>console.log(res)
    //   })
    // }
    
    // const category:IOneLevelSubCategoryCreate={data:{title:'Mobile And Accessories'}}
    //this.mainCategoryService.create(category).subscribe(d=>console.log(d))
  }
getTopSliderProducts():void{
  const sliderImages:Array<ISliderImage>=[]
  const filter=`filters[showTopSlider][$eq]=${true}&populate=*`
     const queryParams:string = `?${filter}`;
     this.productService.getEntries(queryParams)
     .pipe(
      takeUntil(this.$unsubscribe),
      map((products:IProducts):IProduct[]=>products.data),
      tap((products:IProduct[])=>products.map((product:IProduct,index:number)=>{        
        const sliderImage:ISliderImage={
          image:this.appHost+product.attributes.image?.data[0].attributes.formats.medium.url || '',
          thumbImage:this.appHost+product.attributes.image?.data[0].attributes.formats.thumbnail.url || '',
          alt: product.attributes.image?.data[0].attributes.alternativeText|| '',
          title: product.attributes.name,
          order:index+1,
          id:product.id
        };
        sliderImages.push(sliderImage);
      }))
      )      
      .subscribe({
        next:d=>{
          console.log(sliderImages)
          this.imageObject=[...sliderImages,...sliderImages]
        }
      });
}

  showDelaits(e:any):void{
    const imageId=this.imageObject[e].id;
    console.log(this.router);
    this.router.navigate(['details/'+imageId]);
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next(null);
    this.$unsubscribe.complete();
    
  }

}
