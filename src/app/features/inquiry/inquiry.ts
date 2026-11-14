import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StudioPage } from '../../shared/forms/studio-page';
@Component({
  imports: [ReactiveFormsModule],
  styleUrl: './inquiry.css',
  templateUrl: './inquiry.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inquiry extends StudioPage {}
