import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '../../../core/services/store';
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  styleUrl: './footer.css',
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  s = inject(Store);
}
