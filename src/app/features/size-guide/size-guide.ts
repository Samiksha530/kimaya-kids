import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  templateUrl: './size-guide.html',
  styleUrl: './size-guide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeGuide {
  sizes = [
    ['6–12 months', '20', '19', '18'],
    ['1–2 years', '22', '20', '22'],
    ['2–3 years', '23', '21', '25'],
    ['3–4 years', '24', '22', '28'],
    ['4–5 years', '25', '23', '30'],
  ];
}
