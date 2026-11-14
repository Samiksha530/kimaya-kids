import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { Cart } from './cart';
import { Store } from '../../core/services/store';
describe('Cart', () => {
  let f: ComponentFixture<Cart>, c: Cart, el: HTMLElement, s: Store;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Cart],
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
    f = TestBed.createComponent(Cart);
    c = f.componentInstance;
    el = f.nativeElement;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('renders the empty bag with a route back to shopping', () => {
    expect(el.textContent).toContain('Your bag is empty');
  });
  it('removes only the selected size', () => {
    s.add(1, '1–2 years');
    s.add(1, '2–3 years');
    c.remove(1, '1–2 years');
    expect(s.cart().map((l) => l.size)).toEqual(['2–3 years']);
  });
});
