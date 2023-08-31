import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLevelSubCategoryComponent } from './one-level-sub-category.component';

describe('OneLevelSubCategoryComponent', () => {
  let component: OneLevelSubCategoryComponent;
  let fixture: ComponentFixture<OneLevelSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneLevelSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneLevelSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
