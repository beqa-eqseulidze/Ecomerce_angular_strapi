import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy ,OnInit{
  $unsubscribe=new Subject()
  constructor(
    public searchService:SearchService,
    private activtedRoute:ActivatedRoute
    ) { }

 ngOnInit(): void {
  this.activtedRoute.queryParams
    .pipe(
      takeUntil(this.$unsubscribe),
      tap((par) => {       
        if (par['search']) this.searchService.searchText.next(par['search']);
      })
    )
    .subscribe();
 }

 search(input:any){
  this.searchService.searchText.next(input.value)
 }
  ngOnDestroy(): void {
    this.$unsubscribe.next(null);
    this.$unsubscribe.complete();
  }
}
