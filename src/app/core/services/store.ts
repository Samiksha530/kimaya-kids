import { Product, Line, Inquiry, Order } from '../models/shop.models';
import { initialProducts } from '../data/products';
export type { Product, Line } from '../models/shop.models';
import { Injectable, signal, computed, effect } from '@angular/core';
function read<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
  } catch {
    return fallback;
  }
}
function persist(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Browsing remains usable when storage is blocked or full. */
  }
}
@Injectable({ providedIn: 'root' })
export class Store {
  readonly hasSavedProducts = read<Product[] | null>('kk-products', null) !== null;
  products = signal<Product[]>(read('kk-products', initialProducts));
  wish = signal<number[]>(read('kk-wish', []));
  cart = signal<Line[]>(read('kk-cart', []));
  inquiries = signal<Inquiry[]>(read('kk-inquiries', []));
  orders = signal<Order[]>(read('kk-orders', []));
  toast = signal('');
  count = computed(() => this.cart().reduce((a, b) => a + b.qty, 0));
  total = computed(() =>
    this.cart().reduce(
      (a, b) => a + (this.products().find((p) => p.id === b.id)?.price || 0) * b.qty,
      0,
    ),
  );
  constructor() {
    effect(() => persist('kk-products', JSON.stringify(this.products())));
    effect(() => persist('kk-wish', JSON.stringify(this.wish())));
    effect(() => persist('kk-cart', JSON.stringify(this.cart())));
    effect(() => persist('kk-inquiries', JSON.stringify(this.inquiries())));
    effect(() => persist('kk-orders', JSON.stringify(this.orders())));
  }
  removeProduct(id: number) {
    this.products.update((ps) => ps.filter((p) => p.id !== id));
    this.cart.update((ls) => ls.filter((l) => l.id !== id));
    this.wish.update((ids) => ids.filter((i) => i !== id));
    this.notify('Product removed');
  }
  notify(s: string) {
    this.toast.set(s);
    setTimeout(() => this.toast.set(''), 3000);
  }
  toggle(id: number) {
    this.wish.update((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));
  }
  add(id: number, size: string) {
    const p = this.products().find((p) => p.id === id);
    const existing = this.cart().find((x) => x.id === id && x.size === size);
    if (!['6–12 months', '1–2 years', '2–3 years', '3–4 years', '4–5 years'].includes(size)) {
      this.notify('Choose an available size');
      return;
    }
    if (
      !p ||
      this.cart()
        .filter((x) => x.id === id)
        .reduce((n, x) => n + x.qty, 0) >= p.stock
    ) {
      this.notify('Available stock limit reached');
      return;
    }
    this.cart.update((v) =>
      existing
        ? v.map((x) => (x === existing ? { ...x, qty: x.qty + 1 } : x))
        : [...v, { id, size, qty: 1 }],
    );
    this.notify('A little joy added to your bag');
  }
  change(line: Line, delta: number) {
    if (delta > 0) {
      this.add(line.id, line.size);
      return;
    }
    this.cart.update((v) =>
      v.map((x) => (x === line ? { ...x, qty: x.qty - 1 } : x)).filter((x) => x.qty > 0),
    );
  }
}
