import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { Product } from '../models/shop.models';
import { Store } from './store';
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store);
  readonly loading = signal(false);
  readonly error = signal('');
  private loaded = false;
  load(): void {
    if (this.loaded || this.loading()) return;
    this.loading.set(true);
    this.error.set('');
    this.http
      .get<Product[]>('/data/products.json')
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (products) => {
          if (
            !Array.isArray(products) ||
            !products.every(
              (p) =>
                typeof p.id === 'number' &&
                typeof p.name === 'string' &&
                Number.isFinite(p.price) &&
                Array.isArray(p.gallery),
            )
          ) {
            this.error.set('The collection data is unavailable. Please try again.');
            return;
          }
          // Preserve studio edits saved on this device; the HTTP catalogue is the initial seed.
          if (!this.store.hasSavedProducts) this.store.products.set(products);
          this.loaded = true;
        },
        error: () => this.error.set('Please check your connection and try again.'),
      });
  }
}
