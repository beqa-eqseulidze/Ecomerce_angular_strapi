import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCategoryComponent } from './create-edit-category.component';

describe('CreateCategoryComponent', () => {
  let component: CreateEditCategoryComponent;
  let fixture: ComponentFixture<CreateEditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
