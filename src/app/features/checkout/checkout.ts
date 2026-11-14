import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StudioPage } from '../../shared/forms/studio-page';
@Component({
  imports: [RouterLink, CurrencyPipe, ReactiveFormsModule],
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout extends StudioPage {}
