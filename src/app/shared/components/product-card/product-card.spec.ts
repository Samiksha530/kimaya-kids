import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { ProductCard } from './product-card';
import { Store } from '../../../core/services/store';
describe('ProductCard', () => {
  let f: ComponentFixture<ProductCard>, el: HTMLElement, s: Store;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ProductCard],
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
    f = TestBed.createComponent(ProductCard);
    f.componentRef.setInput('p', s.products()[0]);
    el = f.nativeElement;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('links to a shareable product page without invented reviews', () => {
    expect(el.querySelector('.photo-link')?.getAttribute('href')).toBe('/products/1');
    expect(el.textContent).not.toContain('4.9');
  });
  it('toggles wishlist with an accessible pressed state', () => {
    const heart = el.querySelector<HTMLButtonElement>('.heart')!;
    heart.click();
    f.detectChanges();
    expect(s.wish()).toContain(1);
    expect(heart.getAttribute('aria-pressed')).toBe('true');
    heart.click();
    expect(s.wish()).not.toContain(1);
  });
});
