import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoLevelSubCategoryComponent } from './two-level-sub-category.component';

describe('TwoLevelSubCategoryComponent', () => {
  let component: TwoLevelSubCategoryComponent;
  let fixture: ComponentFixture<TwoLevelSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoLevelSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoLevelSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
