import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '../../core/services/store';
import { ProductCard } from '../../shared/components/product-card/product-card';
@Component({
  imports: [RouterLink, ProductCard],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wishlist {
  s = inject(Store);
}
