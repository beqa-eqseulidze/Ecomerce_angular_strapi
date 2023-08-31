import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';


import { IProduct, IProductCreate, IProducts,Iimage } from 'src/app/core/interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<IProductCreate, IProducts> {
  override tbName: string = 'products';

  public products$ = new BehaviorSubject<IProduct[]>([]);

  public deleteProduct(id: number): Observable<any> {
    return this.delete(id).pipe(
      tap((d) => {
        let products = this.products$.getValue();
        let index = products.findIndex((el: IProduct) => {
          el.id === id;
        });
        products.splice(index, 1);
        this.products$.next(products);
      })
    );
  }

  public addProduct(item: IProductCreate,uploadImages?: File[]): Observable<Iimage[]|IProducts> {
    let product: IProduct;
    let formData: FormData = new FormData();
    formData.append('ref', 'api::product.product'); //რომელ კოლექციაზე ვახდენთ სურათის ატვირთვას
    formData.append('field', 'image'); // ველის დასახელება სადაც იტვირთება სურათი
    // formData.append('files', uploadImage); // უშუალოდ სურათი რაც უნდა მიმაგრდეს ( ბინალური  )
    if(uploadImages?.length){
      uploadImages?.forEach((image: File) => formData.append('files', image));
      return this.create(item).pipe(
        map((d: any) => product = d),
        tap((d: IProduct) => {
          formData.append('refId', d.id.toString()); // კოლექციის რომელ ერთეულზე ხდება სურათის ატვირთვა
        }),
        switchMap(() => {
          return this.http.post<Iimage[]>(this.url + 'upload', formData); 
        })
      );
    }
    else{
      return this.create(item)
    }
    
  }

  public editProduct(productId:number,product:IProductCreate,uploadImages:File[]):Observable<any>{
    let formData: FormData = new FormData();
    formData.append('ref', 'api::product.product'); //რომელ კოლექციაზე ვახდენთ სურათის ატვირთვას
    formData.append('field', 'image'); // ველის დასახელება სადაც იტვირთება სურათი
    formData.append('refId', productId.toString()); // კოლექციის რომელ ერთეულზე ხდება სურათის ატვირთვა
    if(uploadImages.length){
     uploadImages.forEach((image: File) =>formData.append('files', image));// უშუალოდ სურათიები რაც უნდა მიმაგრდეს ( ბინალური  )
     return this.update(productId,product).pipe(
         tap(()=>{
         }),
         switchMap(()=>{        
           return this.http.post<any>(this.url + 'upload', formData)
         })
       )
      }
   else{
    return this.update(productId,product)
   }   

  }

  //   notification for successful action
  notification(iconUrl?: string, notificatinText:string=""): void {
    if (window.Notification)
      Notification.requestPermission().then((permision) => {
        if (permision === 'granted')
          new Notification(notificatinText, {
            body: '',
            icon: iconUrl,
          });
      });
  }

  filterProduct(queryParams:string):Observable<IProduct[]>{
    return this.filter(queryParams).pipe(
     map((products:IProducts)=>{
      this.products$.next(products.data)
      return products.data
    })
    )
  }

}
