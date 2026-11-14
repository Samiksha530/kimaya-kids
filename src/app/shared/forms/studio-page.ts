import { Directive, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '../../core/services/store';
@Directive()
export abstract class StudioPage {
  s = inject(Store);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  page = signal('');
  attempted = signal(false);
  success = signal('');

  today = new Date().toLocaleDateString('en-CA');

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    details: ['', [Validators.required, Validators.minLength(10)]],
    date: [''],
    time: [''],
    age: [''],
    chest: ['', [Validators.min(1), Validators.max(100)]],
    waist: ['', [Validators.min(1), Validators.max(100)]],
    length: ['', [Validators.min(1), Validators.max(100)]],
  });
  constructor() {
    this.route.data.pipe(takeUntilDestroyed()).subscribe((p) => {
      this.page.set(p['page'] || 'contact');
      this.success.set('');
      this.attempted.set(false);
      this.form.reset();
      for (const k of ['date', 'time'] as const) {
        this.form.controls[k].setValidators(
          this.page() === 'appointment' ? [Validators.required] : [],
        );
        this.form.controls[k].updateValueAndValidity();
      }
    });
  }
  product(id: number) {
    return this.s.products().find((p) => p.id === id);
  }
  submit(kind: string) {
    this.attempted.set(true);
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    if (kind === 'appointment' && v.date < this.today) {
      this.s.notify('Choose a future date');
      return;
    }
    const id = 'KK-' + Date.now().toString().slice(-8);
    if (kind === 'order') {
      if (!this.s.cart().length) return;
      if (
        this.s.cart().some((l) => !this.product(l.id)) ||
        this.s.products().some(
          (p) =>
            this.s
              .cart()
              .filter((l) => l.id === p.id)
              .reduce((n, l) => n + l.qty, 0) > p.stock,
        )
      ) {
        this.s.notify('Stock changed. Please review your bag.');
        return;
      }
      this.s.orders.update((x) => [
        ...x,
        { ...v, id, total: this.s.total(), items: this.s.cart() },
      ]);
      this.s.products.update((ps) =>
        ps.map((p) => ({
          ...p,
          stock:
            p.stock -
            this.s
              .cart()
              .filter((l) => l.id === p.id)
              .reduce((a, l) => a + l.qty, 0),
        })),
      );
      this.s.cart.set([]);
    } else {
      this.s.inquiries.update((x) => [...x, { ...v, id, kind, status: 'New' }]);
    }
    this.success.set(id);
    this.form.reset();
    this.attempted.set(false);
  }
}
