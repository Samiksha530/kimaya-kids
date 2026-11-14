import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { Checkout } from './checkout';
import { Store } from '../../core/services/store';
describe('Checkout', () => {
  let f: ComponentFixture<Checkout>, c: Checkout, s: Store;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Checkout],
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
    f = TestBed.createComponent(Checkout);
    c = f.componentInstance;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('blocks an invalid checkout without creating an order', () => {
    c.submit('order');
    expect(c.attempted()).toBe(true);
    expect(s.orders()).toHaveLength(0);
  });
  it('saves an order, decrements stock and clears the bag', () => {
    s.add(1, '1–2 years');
    c.form.patchValue({
      name: 'Demo Parent',
      email: 'demo@example.com',
      phone: '9876543210',
      details: 'Demo street Pune 411001',
    });
    c.submit('order');
    expect(s.orders()).toHaveLength(1);
    expect(s.orders()[0].total).toBe(1899);
    expect(s.products()[0].stock).toBe(11);
    expect(s.cart()).toHaveLength(0);
  });
  it('rejects stock changed after an item entered the bag', () => {
    s.add(1, '1–2 years');
    s.products.update((ps) => ps.map((p) => (p.id === 1 ? { ...p, stock: 0 } : p)));
    c.form.patchValue({
      name: 'Demo',
      email: 'demo@example.com',
      phone: '9876543210',
      details: 'Demo address 411001',
    });
    c.submit('order');
    expect(s.orders()).toHaveLength(0);
    expect(s.count()).toBe(1);
  });
});
