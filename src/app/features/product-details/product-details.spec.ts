import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { ProductDetails } from './product-details';
import { Store } from '../../core/services/store';
describe('ProductDetails', () => {
  let f: ComponentFixture<ProductDetails>, c: ProductDetails, el: HTMLElement, s: Store;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '4' })),
            data: of({ page: 'custom' }),
            snapshot: { paramMap: convertToParamMap({ id: '4' }) },
          },
        },
      ],
    }).compileComponents();
    s = TestBed.inject(Store);
    f = TestBed.createComponent(ProductDetails);
    c = f.componentInstance;
    el = f.nativeElement;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('finds the dress from its route and adds the selected size', () => {
    expect(c.product()?.id).toBe(4);
    c.size.set('2–3 years');
    s.add(c.product()!.id, c.size());
    expect(s.cart()[0]).toEqual({ id: 4, size: '2–3 years', qty: 1 });
  });
  it('renders an unavailable product state when the dress is removed', () => {
    s.removeProduct(4);
    f.detectChanges();
    expect(el.textContent).toContain("We couldn't find this dress");
  });
});
