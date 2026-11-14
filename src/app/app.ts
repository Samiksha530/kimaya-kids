import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { Store } from './core/services/store';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  s = inject(Store);
}
