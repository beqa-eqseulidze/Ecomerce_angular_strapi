import { TestBed } from '@angular/core/testing';

import { CategoriesDataResolver } from './categories-data.resolver';

describe('CategoriesDataResolver', () => {
  let resolver: CategoriesDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoriesDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
