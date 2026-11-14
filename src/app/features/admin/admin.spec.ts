import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { Admin } from './admin';
import { Store } from '../../core/services/store';
describe('Admin', () => {
  let f: ComponentFixture<Admin>, c: Admin, s: Store;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Admin],
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
    f = TestBed.createComponent(Admin);
    c = f.componentInstance;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('rejects incomplete product details', () => {
    c.saveProduct();
    expect(s.products()).toHaveLength(10);
  });
  it('adds a product and preserves galleries when editing its name', () => {
    c.adminForm.patchValue({ name: 'New dress' });
    c.saveProduct();
    expect(s.products()).toHaveLength(11);
    const product = s.products().find((p) => p.id === 5)!;
    c.editing.set(product.id);
    c.adminForm.patchValue({ ...product, name: 'Edited lehenga' });
    c.saveProduct();
    expect(s.products().find((p) => p.id === 5)?.gallery).toEqual(product.gallery);
  });
  it('deletes related cart and wishlist entries with the product', () => {
    s.toggle(1);
    s.add(1, '1–2 years');
    s.removeProduct(1);
    expect(s.products().some((p) => p.id === 1)).toBe(false);
    expect(s.wish()).not.toContain(1);
    expect(s.cart()).toHaveLength(0);
  });
});
