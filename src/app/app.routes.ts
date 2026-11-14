import { Routes } from '@angular/router';
import { checkoutGuard } from './core/guards/checkout.guard';
export const routes: Routes = [
  {
    path: '',
    title: 'Kimaya Kids | Traditional dresses for little celebrations',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'products/:id',
    title: 'Dress details | Kimaya Kids',
    loadComponent: () =>
      import('./features/product-details/product-details').then((m) => m.ProductDetails),
  },
  {
    path: 'wishlist',
    title: 'Your favourites | Kimaya Kids',
    loadComponent: () => import('./features/wishlist/wishlist').then((m) => m.Wishlist),
  },
  {
    path: 'cart',
    title: 'Shopping bag | Kimaya Kids',
    loadComponent: () => import('./features/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'checkout',
    title: 'Demo checkout | Kimaya Kids',
    canActivate: [checkoutGuard],
    loadComponent: () => import('./features/checkout/checkout').then((m) => m.Checkout),
  },
  {
    path: 'custom',
    title: 'Custom dress design | Kimaya Kids',
    data: { page: 'custom' },
    loadComponent: () => import('./features/inquiry/inquiry').then((m) => m.Inquiry),
  },
  {
    path: 'appointment',
    title: 'Design consultation | Kimaya Kids',
    data: { page: 'appointment' },
    loadComponent: () => import('./features/inquiry/inquiry').then((m) => m.Inquiry),
  },
  {
    path: 'contact',
    title: 'Contact the studio | Kimaya Kids',
    data: { page: 'contact' },
    loadComponent: () => import('./features/inquiry/inquiry').then((m) => m.Inquiry),
  },
  {
    path: 'about',
    title: 'Our story | Kimaya Kids',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'size-guide',
    title: 'Kids dress size guide | Kimaya Kids',
    loadComponent: () => import('./features/size-guide/size-guide').then((m) => m.SizeGuide),
  },
  {
    path: 'admin',
    title: 'Demo studio dashboard | Kimaya Kids',
    loadComponent: () => import('./features/admin/admin').then((m) => m.Admin),
  },
  {
    path: '**',
    title: 'Page not found | Kimaya Kids',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
