import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '../../../core/services/store';
import { Product } from '../../../core/models/shop.models';
@Component({
  selector: 'product-card',
  imports: [CurrencyPipe, RouterLink],
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  p = input.required<Product>();
  s = inject(Store);
}
