import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { IPagination, IProduct, IProducts } from 'src/app/core/interface';
import { ProductService } from 'src/app/core/services';


@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss'],
})
export class ProductManagerComponent implements OnInit, OnDestroy {

  constructor(
    public productService: ProductService,
    private router:Router,
    private activatedRoute:ActivatedRoute
    ) {}
  private unsunscribe$ = new Subject();
  public paginate$ = new Subject<IPagination>();
  public products?: Observable<IProduct[]>;

  pageSize!: number ;
  page!: number ;

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(
      takeUntil(this.unsunscribe$),
      tap(param=>{
        this.page=param['page']
        this.pageSize=param['pageSize']      
      })
    )
    .subscribe({
      next:()=> this.loadPage(this.page, this.pageSize),
      error:(err)=>console.log(err)
    })
  }

  changePage(page: number): void {
    this.page = page;
    this.router.navigate(['/content-manager/product-manager'],{queryParams:{page:this.page,pageSize:this.pageSize}})
    this.loadPage(this.page, this.pageSize);
  }
  changePageSize(n: any): void {
    this.pageSize = n;
    this.page = 1;
    this.router.navigate(['/content-manager/product-manager'],{queryParams:{page:this.page,pageSize:this.pageSize}})
    this.loadPage(this.page, this.pageSize);
  }

  loadPage(page: number, pageSize: number): void {
    let queryParams: string = '';
    queryParams = `?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=parent&populate=image`;
    this.productService
      .getEntries(queryParams)
      .pipe(
        takeUntil(this.unsunscribe$),
        tap((data: IProducts) => {
          this.productService.products$.next(data.data);
          this.products = this.productService.products$;
          let paginateInfo = data.meta;
          if (paginateInfo) this.paginate$.next(paginateInfo);
        })
      )
      .subscribe();
  }

  delete(id: number): void {
    if (confirm(' are you sure ')) {
      this.productService
        .deleteProduct(id)
        .pipe(takeUntil(this.unsunscribe$))
        .subscribe({
          next: () => {},
          error: (error: any) => alert(error.error.error.message),
        });
    }
  }

  ngOnDestroy(): void {
    this.unsunscribe$.next(null);
    this.unsunscribe$.complete();
  }
}
