import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, Product } from '../../core/services/store';
@Component({
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Admin {
  s = inject(Store);
  fb = inject(FormBuilder);
  editing = signal(0);
  deleting = signal(0);
  adminForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    price: [1899, [Validators.required, Validators.min(1)]],
    stock: [10, [Validators.required, Validators.min(0)]],
    image: [1, [Validators.required, Validators.min(1), Validators.max(16)]],
    color: ['Pink', Validators.required],
    type: ['Frocks', Validators.required],
  });
  edit(p: Product) {
    this.editing.set(p.id);
    this.adminForm.patchValue(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  saveProduct() {
    if (this.adminForm.invalid) return;
    const v = this.adminForm.getRawValue();
    const id = this.editing() || Date.now();
    this.s.products.update((ps) =>
      this.editing()
        ? ps.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...v,
                  gallery: p.image === v.image ? p.gallery : [v.image],
                }
              : p,
          )
        : [...ps, { ...v, id, gallery: [v.image] }],
    );
    this.editing.set(0);
    this.adminForm.reset({
      price: 1899,
      stock: 10,
      image: 1,
      color: 'Pink',
      type: 'Frocks',
    });
    this.s.notify('Product saved');
  }
  status(id: string, status: string) {
    this.s.inquiries.update((xs) => xs.map((x) => (x.id === id ? { ...x, status } : x)));
  }
}
