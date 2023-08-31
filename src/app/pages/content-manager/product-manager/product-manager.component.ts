import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, combineLatestWith, map, takeUntil, tap } from 'rxjs';
import { IPagination, IProduct, IProducts } from 'src/app/core/interface';
import { ProductService } from 'src/app/core/services';
import { SearchService } from '../../../core/services/search.service';


@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss'],
})
export class ProductManagerComponent implements OnInit, OnDestroy {

  constructor(
    public productService: ProductService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private searchService:SearchService,
    ) {}
  private unsubscribe$ = new Subject();
  public paginate$ = new Subject<IPagination>();
  public products?: Observable<IProduct[]>;

  pageSize!: number ;
  page!: number ;
  searchText:string='';
  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(        
      tap((param)=>{
        this.page=param['page'];
        this.pageSize=param['pageSize'];
        this.searchText=param['search'];       
      }),   
      takeUntil(this.unsubscribe$)
    )
    .subscribe({      
      next:(d)=>{this.loadPage(this.searchText,this.page, this.pageSize)},
      error:(err)=>console.log(err)
    });

    this.searchService.searchText
    .pipe(
      takeUntil(this.unsubscribe$),
      tap((text)=>{
        this.searchText=text;
        this.router.navigate(['/content-manager/product-manager'],{queryParams:{page:this.page,pageSize:this.pageSize,search:this.searchText}})
      })
    ).subscribe()
  }

  changePage(page: number): void {
    this.page = page;
    this.router.navigate(['/content-manager/product-manager'],{queryParams:{page:this.page,pageSize:this.pageSize,search:this.searchText}})   
  }
  changePageSize(n: any): void {
    this.pageSize = n;
    this.page = 1;
    this.router.navigate(['/content-manager/product-manager'],{queryParams:{page:this.page,pageSize:this.pageSize,search:this.searchText}})
  }
  

  loadPage(search:string,page: number, pageSize: number): void { 
    let filter=''
    if(search!=='') filter=`filters[$or][0][name][$contains]=${search}&filters[$or][2][description][$contains]=${search}&filters[$or][3][price][$contains]=${search}&filters[$or][4][parent][title][$contains]=${search}&`
     const queryParams = `?${filter}pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=parent&populate=image`;
    this.productService
      .getEntries(queryParams,false)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((data: IProducts) => {
          this.productService.products$.next(data.data);
          this.products = this.productService.products$;
          let paginateInfo = data.meta;
          if (paginateInfo) this.paginate$.next(paginateInfo);
        })
      ).subscribe()
     ;
  }

  delete(id: number): void {
    if (confirm(' are you sure ')) {
      this.productService
        .deleteProduct(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {},
          error: (error: any) => alert(error.error.error.message),
        });
    }
  }
   
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();  
  }
}
