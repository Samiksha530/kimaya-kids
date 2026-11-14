import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { Home } from './home';
import { Store } from '../../core/services/store';
describe('Home', () => {
  let f: ComponentFixture<Home>, c: Home, el: HTMLElement, s: Store;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Home],
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
    f = TestBed.createComponent(Home);
    c = f.componentInstance;
    el = f.nativeElement;
    f.detectChanges();
    TestBed.inject(HttpTestingController).expectOne('/data/products.json').flush(s.products());
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('filters styles, colours and text together', () => {
    c.type.set('Frocks');
    c.color.set('Pink');
    c.query.set('Rose');
    expect(c.filtered().map((p) => p.id)).toEqual([3]);
  });
  it('sorts prices and restores empty filters', () => {
    c.sort.set('high');
    expect(c.filtered()[0].price).toBe(2499);
    c.query.set('missing dress');
    f.detectChanges();
    expect(el.textContent).toContain('No little finds');
    c.reset();
    expect(c.filtered().length).toBe(10);
  });
});
