import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { Wishlist } from './wishlist';
import { Store } from '../../core/services/store';
describe('Wishlist', () => {
  let f: ComponentFixture<Wishlist>, el: HTMLElement, s: Store;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Wishlist],
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
    f = TestBed.createComponent(Wishlist);
    el = f.nativeElement;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('shows an empty state before a dress is saved', () => {
    expect(el.textContent).toContain('No favourites saved');
  });
  it('renders saved products only', () => {
    s.toggle(4);
    f.detectChanges();
    expect(el.querySelectorAll('product-card').length).toBe(1);
    expect(el.textContent).toContain('Emerald Bloom');
  });
});
