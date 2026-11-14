import { HttpInterceptorFn } from '@angular/common/http';
import { timeout } from 'rxjs';
// Avoid a permanently pending catalogue when a connection stalls.
export const requestTimeoutInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(timeout(12000));
