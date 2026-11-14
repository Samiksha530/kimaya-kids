import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Store } from '../../core/services/store';
@Component({
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  s = inject(Store);
  product(id: number) {
    return this.s.products().find((p) => p.id === id);
  }
  remove(id: number, size: string) {
    this.s.cart.update((lines) => lines.filter((l) => l.id !== id || l.size !== size));
  }
}
