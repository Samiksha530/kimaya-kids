import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { Store } from '../../core/services/store';
@Component({
  imports: [RouterLink, CurrencyPipe],
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetails {
  s = inject(Store);
  params = toSignal(inject(ActivatedRoute).paramMap);
  product = computed(() =>
    this.s.products().find((p) => p.id === Number(this.params()?.get('id'))),
  );
  image = signal(0);
  size = signal('6–12 months');
  sizes = ['6–12 months', '1–2 years', '2–3 years', '3–4 years', '4–5 years'];
}
