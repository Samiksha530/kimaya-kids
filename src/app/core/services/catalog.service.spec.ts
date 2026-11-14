import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { CatalogService } from './catalog.service';
import { Store } from './store';
describe('HTTP catalogue', () => {
  let api: CatalogService, http: HttpTestingController;
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(CatalogService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('loads typed data and suppresses duplicate pending requests', () => {
    api.load();
    api.load();
    expect(api.loading()).toBe(true);
    http.expectOne('/data/products.json').flush(TestBed.inject(Store).products());
    expect(api.loading()).toBe(false);
    expect(api.error()).toBe('');
    api.load();
    http.expectNone('/data/products.json');
  });
  it('exposes a failed request and allows retry', () => {
    api.load();
    http
      .expectOne('/data/products.json')
      .flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    expect(api.loading()).toBe(false);
    expect(api.error()).toContain('connection');
    api.load();
    http.expectOne('/data/products.json').flush(TestBed.inject(Store).products());
    expect(api.error()).toBe('');
  });
  it('rejects malformed responses without replacing the catalogue', () => {
    api.load();
    http.expectOne('/data/products.json').flush({ products: 'invalid' });
    expect(api.error()).toContain('unavailable');
    expect(TestBed.inject(Store).products()).toHaveLength(10);
  });
  it('applies the HTTP response after initial browser persistence has run', () => {
    const store = TestBed.inject(Store);
    TestBed.tick();
    api.load();
    const updated = store.products().map((p) => ({ ...p, price: 3200 }));
    http.expectOne('/data/products.json').flush(updated);
    expect(store.products()[0].price).toBe(3200);
  });
});
