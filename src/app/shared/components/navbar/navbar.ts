import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '../../../core/services/store';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  s = inject(Store);
}
