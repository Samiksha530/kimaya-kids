import { TestBed } from '@angular/core/testing';
import { provideRouter, UrlTree } from '@angular/router';
import { beforeEach, describe, it, expect } from 'vitest';
import { checkoutGuard } from './checkout.guard';
import { Store } from '../services/store';
describe('Checkout guard', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });
  it('redirects an empty bag to the cart', () => {
    const result = TestBed.runInInjectionContext(() => checkoutGuard({} as never, {} as never));
    expect(result instanceof UrlTree).toBe(true);
    expect(result.toString()).toBe('/cart');
  });
  it('allows checkout with a selected dress', () => {
    TestBed.inject(Store).add(1, '1–2 years');
    expect(TestBed.runInInjectionContext(() => checkoutGuard({} as never, {} as never))).toBe(true);
  });
});
