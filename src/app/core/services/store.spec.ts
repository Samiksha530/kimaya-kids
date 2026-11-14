import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';
import { Store } from './store';
describe('Shopping state', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });
  it('keeps different sizes separate and combines matching sizes', () => {
    const s = TestBed.inject(Store);
    s.add(1, '1–2 years');
    s.add(1, '2–3 years');
    s.add(1, '1–2 years');
    expect(s.cart().length).toBe(2);
    expect(s.count()).toBe(3);
    expect(s.total()).toBe(5697);
  });
  it('prevents adding more than available stock across sizes', () => {
    const s = TestBed.inject(Store);
    s.products.update((ps) => ps.map((p) => (p.id === 1 ? { ...p, stock: 1 } : p)));
    s.add(1, '1–2 years');
    s.add(1, '2–3 years');
    expect(s.count()).toBe(1);
  });
  it('removes a line when its last unit is removed', () => {
    const s = TestBed.inject(Store);
    s.add(1, '1–2 years');
    s.change(s.cart()[0], -1);
    expect(s.cart()).toEqual([]);
    expect(s.total()).toBe(0);
  });
  it('toggles wishlist membership without duplicates', () => {
    const s = TestBed.inject(Store);
    s.toggle(4);
    expect(s.wish()).toEqual([4]);
    s.toggle(4);
    expect(s.wish()).toEqual([]);
  });
});
