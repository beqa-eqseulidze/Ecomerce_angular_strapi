import { HttpClient} from '@angular/common/http';
import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { Location } from '@angular/common';

import {
  IProduct,
  IProductCreate,
  IProducts,
  ITwoLevelSubCategory,
  Iimage,
} from 'src/app/core/interface';

import {
  ProductService,
  TwoLevelSubCategoryService,
} from 'src/app/core/services';

import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss'],
})
export class CreateEditProductComponent implements OnInit, OnDestroy {

  constructor(
    private http:HttpClient,
    public productService: ProductService,
    private activatedRoute: ActivatedRoute,
    public twoLevelSubCategoryService: TwoLevelSubCategoryService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private location:Location
  ){}

    private unsubscribe$ = new Subject();
    public productId?: number;
    public productImages:Iimage[]=[];
    public errorText?: string;
    private uploadImages: File[] = [];
    public uploadImageUrls: SafeUrl[] = [];
    public appHost=environment.appHost

  ngOnInit(): void {
    this.productImages=[]
    this.uploadImages=[]
    this.uploadImageUrls=[]    
    this.activatedRoute.params.subscribe((params) => {if (params['id']) this.productId = +params['id']});    
    if (!this.twoLevelSubCategoryService.entries$.getValue().length){
      this.twoLevelSubCategoryService
        .getEntries('?populate=*')
        .pipe(
          takeUntil(this.unsubscribe$),
          map((d: any): ITwoLevelSubCategory[] => d.data)
        )
        .subscribe((d: ITwoLevelSubCategory[]) =>
          this.twoLevelSubCategoryService.entries$.next(d)
        )
    }
    if(this.productId){
      let product:IProduct|undefined=this.productService.products$.getValue().find((item:IProduct)=>item.id===this.productId)
      if(product){         
        this.form.patchValue(product.attributes)
        this.form.controls['parent'].setValue(product.attributes.parent?.data.id)      
        product.attributes.image?.data?.forEach(image=>this.productImages.push(image))               
      }
    }
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl(''),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d*(\.\d+)?$/),
    ]),
    oldPrice: new FormControl('', [
      Validators.min(0),
      Validators.pattern(/^\d*(\.\d+)?$/),
    ]),
    quantity: new FormControl('1', [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d*(\.\d+)?$/),
    ]),
    OnHome:new FormControl(false,[Validators.required]),
    inTopSlider:new FormControl(false,[Validators.required]),
    warranty: new FormControl(''),
    parent: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
  });

  addImage(e: Event) {
    let el = e.target as HTMLInputElement;
    let image: File = el.files![0];
    this.uploadImageUrls.push(
      this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image))
    );
    this.uploadImages.push(image);
  }

  // works in create mode ;
  deletImage(i: number): void {
    this.uploadImageUrls.splice(i, 1);
    this.uploadImages.splice(i, 1);
  }

// works in edit mode 
  deletProductImage(id:number):void{      
      this.http.delete<any>(environment.apiUrl+'upload/files/'+id).pipe(
      takeUntil(this.unsubscribe$),
      tap(()=>this.productImages=this.productImages.filter((image:Iimage)=>image.id!==id))      
    ).subscribe()
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.errorText = 'fill in form correctly';
        return;
    }
    let product:IProductCreate = { data: this.form.value };
    // edit mode 
    if(this.productId){
      this.productService.editProduct(this.productId,product,this.uploadImages)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (d)=>{
          d[0]?.url? this.productService.notification(environment.appHost + d[0].url,'Product Updated Successfully'):this.productService.notification('','Product Updated Successfully')
          this.form.reset();
          this.uploadImageUrls = [];
          this.uploadImages = [];
          this.GoToBack();
        },
        error:(error)=>{this.errorText = error.error.error.message}
      })
    }
    // create mode 
    else{
      this.productService.addProduct(product, this.uploadImages).subscribe({
        next: (d:any) => {  
          d[0]?.url? this.productService.notification(environment.appHost + d[0].url,'Product Added Successfully'):this.productService.notification('','Product Updated Successfully')
          this.form.reset();
          this.uploadImageUrls = [];
          this.uploadImages = [];
          this.GoToBack();
        },
        error: (error: any) => {
          this.errorText = error.error.error.message;
        },
      });
    }    
  }

  // back to category manager page
  GoToBack(): void {
    this.location.back()    
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
