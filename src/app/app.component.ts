import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AuthService,
  UserService,
  UploadImageUrlsService,
} from 'src/app/core/services';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductService } from './core/services/product.service';
import { IProductCreate } from './core/interface';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title = 'Ecomerce';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient,
    private uploadImageUrlsService: UploadImageUrlsService,
    private productservice: ProductService
  ) {}

  // form:FormGroup=new FormGroup({
  //   title:new FormControl('', Validators.required)
  // })

  submit() {
    // if(this.form.valid){
    //   console.log({...this.form.value,imageUrls:this.uploadImageUrlsService.imageUrls$.getValue()})
    //   this.form.reset()
    //   location.reload()
    // }
  }

  test(e: Event) {
    console.dir(e);
    let newProduct: IProductCreate = {
      data: {
        name: 'test4',
        description: 'test 4 description',
        price: 100,
        quantity: 15,
        warranty: '2 year warrenty',
        parent: 22,
      },
    };
    // this.productservice.addProduct(newProduct)
  }

  ngOnInit(): void {
    //  this.authService.signIn({identifier:'ana@gmail.com',password:'A123456'}).subscribe()
  }
  //  this.authService.signIn({identifier:'beqa@gmail.com',password:'B123456'}).subscribe();
  //  setTimeout(() => {
  //   this.authService.unsubscribe$.next('');
  //   this.authService.unsubscribe$.complete();
  // },1000)
}
