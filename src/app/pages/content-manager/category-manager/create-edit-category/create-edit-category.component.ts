import {
  AfterContentInit,
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MainCategoryService } from '../../../../core/services/main-category.service';
import { OneLevelSubCategoryService } from '../../../../core/services/one-level-sub-category.service';
import { TwoLevelSubCategoryService } from '../../../../core/services/two-level-sub-category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import {
  IMainCategory,
  IMainCategoryCreate,
  IOneLevelSubCategory,
  ITwoLevelSubCategory,
} from 'src/app/core/interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss'],
})
export class CreateEditCategoryComponent implements OnInit, OnDestroy {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mainCategoryService: MainCategoryService,
    private oneLevelSubCategoryService: OneLevelSubCategoryService,
    private twoLevelSubCategoryService: TwoLevelSubCategoryService
  ) {}

  unsubscribe$ = new Subject();
  categoryType?: string;
  catId?: number;
  parents?: IMainCategory[] | IOneLevelSubCategory[];
  errorText?: string;

  ngOnInit(): void {
    this.categoryType = this.activatedRoute.snapshot.url[0]?.path;
    this.catId = parseInt(this.activatedRoute.snapshot.url[2]?.path);
    switch (this.categoryType) {
      case 'main-category':
        //  if componet works in edit mode set form;
        if (this.catId) {
          let editCategory = this.mainCategoryService.entries$
            .getValue()
            .find((cat: IMainCategory) => cat.id === this.catId);
          if (editCategory) {
            this.form.patchValue({ title: editCategory.attributes.title });
          } else {
            console.error("don't found requested entry in state");
          }
        }
        break;
      case 'one-level-sub-category':
        // get parent category entries;
        this.mainCategoryService
          .getEntries()
          .pipe(
            takeUntil(this.unsubscribe$),
            tap((d: any) => {
              this.parents = d.data;
            })
          )
          .subscribe();
        // if componet works in edit mode set form;
        if (this.catId) {
          let editCategory = this.oneLevelSubCategoryService.entries$
            .getValue()
            .find((cat: IOneLevelSubCategory) => cat.id === this.catId);
          if (editCategory) {
            this.form.patchValue({
              title: editCategory.attributes.title,
              parent: editCategory.attributes.main_categories?.data[0].id,
            });
          } else {
            console.error("don't found requested entry in state");
          }
        }
        break;
      case 'two-level-sub-category':
        // get parent category entries;
        this.oneLevelSubCategoryService
          .getEntries()
          .pipe(
            takeUntil(this.unsubscribe$),
            tap((d: any) => {
              this.parents = d.data;
            })
          )
          .subscribe();

        if (this.catId) {
          let editCategory = this.twoLevelSubCategoryService.entries$
            .getValue()
            .find((cat: ITwoLevelSubCategory) => cat.id === this.catId);
          if (editCategory) {
            this.form.patchValue({
              title: editCategory.attributes.title,
              parent:
                editCategory.attributes.one_level_sub_categories?.data[0].id,
            });
          } else {
            console.error("don't found requested entry in state");
          }
        }
        break;
    }
  }

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    parent: new FormControl(''),
  });

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.errorText = 'fill in form correctly';
      return;
    }
    if (
      this.categoryType !== 'main-category' &&
      this.form.controls['parent'].value == ''
    ) {
      this.errorText = 'choose parent categores';
      return;
    }
    // call properly service
    let body;
    let title = this.form.controls['title'].value.trim();
    let parent = this.form.controls['parent'].value;

    switch (this.categoryType) {
      // this  blok of this code works then create 'min_categories' entry
      case 'main-category':
        body = { data: { title } };
        //if component works edit mode:
        if (this.catId) {
          this.mainCategoryService
            .update(this.catId, body)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
              next: (cat: IMainCategory) => {
                let categories: IMainCategory[] =
                  this.mainCategoryService.entries$.getValue();
                let index = categories.findIndex(
                  (cat: IMainCategory) => cat.id === this.catId
                );
                if (index >= 0) {
                  categories[index] = { ...categories[index], ...cat };
                  this.mainCategoryService.entries$.next(categories);
                } else {
                  console.error('categoriy not foud in state ');
                }
                this.GoToBack();
              },
              error: (error: any) => console.error(error),
            });
        }
        // if component works in create mode:
        else {
          this.mainCategoryService
            .create(body)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
              next: (d: IMainCategory) => {
                this.mainCategoryService.entries$.next([
                  ...this.mainCategoryService.entries$.getValue(),
                  d,
                ]);

                this.GoToBack();
              },
              error: (error: any) => {
                this.errorText = error.error.error.message;
              },
            });
        }
        break;
      // this  pice of this code works then creates 'one_level_sub_categories' entry
      case 'one-level-sub-category':
        body = {
          data: {
            title: title,
            main_categories: parent,
          },
        };
        // if component works in edit mode:
        if (this.catId) {
          this.oneLevelSubCategoryService
            .update(this.catId, body)
            .pipe(
              takeUntil(this.unsubscribe$),
              switchMap((cat: IOneLevelSubCategory) => {
                return this.oneLevelSubCategoryService.getById(
                  cat.id,
                  '?populate=main_categories'
                );
              })
            )
            .subscribe({
              next: (cat: IOneLevelSubCategory) => {
                let categories: IOneLevelSubCategory[] =
                  this.oneLevelSubCategoryService.entries$.getValue();
                let index = categories.findIndex(
                  (cat: IOneLevelSubCategory) => cat.id === this.catId
                );
                if (index >= 0) {
                  categories[index] = { ...categories[index], ...cat };
                  this.oneLevelSubCategoryService.entries$.next(categories);
                } else {
                  console.error('categoriy not foud in state ');
                }
                this.GoToBack();
              },
              error: (error: any) => console.error(error),
            });
        }
        //if component works in create mode:
        else {
          this.oneLevelSubCategoryService
            .create(body)
            .pipe(
              takeUntil(this.unsubscribe$),
              // get recently created category's parent category
              switchMap((cat: IOneLevelSubCategory) => {
                return this.oneLevelSubCategoryService.getById(
                  cat.id,
                  '?populate=main_categories'
                );
              })
            )
            .subscribe({
              next: (cat: IOneLevelSubCategory) => {
                this.oneLevelSubCategoryService.entries$.next([
                  ...this.oneLevelSubCategoryService.entries$.getValue(),
                  cat,
                ]);
                this.GoToBack();
              },
              error: (error: any) => {
                this.errorText = error.error.error.message;
              },
            });
        }
        break;
      // this  pice of this code works then creates or edits 'two_level_sub_categories' entry
      case 'two-level-sub-category':
        body = {
          data: {
            title: title,
            one_level_sub_categories: parent,
          },
        };
        //  if componet works in edit mode :
        if (this.catId) {
          this.twoLevelSubCategoryService
            .update(this.catId, body)
            .pipe(
              takeUntil(this.unsubscribe$),
              switchMap((cat: ITwoLevelSubCategory) => {
                return this.twoLevelSubCategoryService.getById(
                  cat.id,
                  '?populate=one_level_sub_categories'
                );
              })
            )
            .subscribe({
              next: (cat: ITwoLevelSubCategory) => {
                let categories: ITwoLevelSubCategory[] =
                  this.twoLevelSubCategoryService.entries$.getValue();
                let index = categories.findIndex(
                  (cat: ITwoLevelSubCategory) => cat.id === this.catId
                );
                if (index >= 0) {
                  categories[index] = { ...categories[index], ...cat };
                  this.twoLevelSubCategoryService.entries$.next(categories);
                } else {
                  console.error('categoriy not foud in state ');
                }
                this.GoToBack();
              },
              error: (error: any) => console.error(error),
            });
        }
        // if component works in create mode
        else {
          this.twoLevelSubCategoryService
            .create(body)
            .pipe(
              takeUntil(this.unsubscribe$),
              // get recently created category's parent category
              switchMap((cat: ITwoLevelSubCategory) => {
                return this.twoLevelSubCategoryService.getById(
                  cat.id,
                  '?populate=one_level_sub_categories'
                );
              })
            )
            .subscribe({
              next: (cat: ITwoLevelSubCategory) => {
                this.twoLevelSubCategoryService.entries$.next([
                  ...this.twoLevelSubCategoryService.entries$.getValue(),
                  cat,
                ]);
                this.GoToBack();
              },
              error: (error: any) => {
                this.errorText = error.error.error.message;
              },
            });
        }
        break;
    }
  }

  // back to category manager page
  GoToBack(): void {
    let url!: string;
    //component works in edit mode
    if (this.catId) {
      url = this.router.url
        .split('/')
        .slice(0, length - 2)
        .join('/');
    }
    // component works in create mode
    else {
      url = this.router.url
        .split('/')
        .slice(0, length - 1)
        .join('/');
    }
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
