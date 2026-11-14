import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '../services/store';
export const checkoutGuard: CanActivateFn = () =>
  inject(Store).cart().length > 0 || inject(Router).createUrlTree(['/cart']);
