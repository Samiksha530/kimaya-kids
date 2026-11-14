import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'loading-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './loading-skeleton.css',
  templateUrl: './loading-skeleton.html',
})
export class LoadingSkeleton {}
