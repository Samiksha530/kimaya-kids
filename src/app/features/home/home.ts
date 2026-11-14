import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '../../core/services/store';
import { CatalogService } from '../../core/services/catalog.service';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { LoadingSkeleton } from '../../shared/components/loading-skeleton/loading-skeleton';
@Component({
  imports: [ProductCard, RouterLink, LoadingSkeleton],
  styleUrl: './home.css',
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  s = inject(Store);
  catalog = inject(CatalogService);
  constructor() {
    this.catalog.load();
  }
  type = signal('All Traditional');
  query = signal('');
  color = signal('');
  sort = signal('featured');
  filtered = computed(() => {
    const p = this.s
      .products()
      .filter(
        (p) =>
          (this.type() === 'All Traditional' || p.type === this.type()) &&
          (!this.color() || p.color === this.color()) &&
          p.name.toLowerCase().includes(this.query().toLowerCase()),
      );
    return this.sort() === 'low'
      ? p.sort((a, b) => a.price - b.price)
      : this.sort() === 'high'
        ? p.sort((a, b) => b.price - a.price)
        : p;
  });
  reset() {
    this.type.set('All Traditional');
    this.color.set('');
    this.query.set('');
  }
}
