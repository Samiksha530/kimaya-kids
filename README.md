# Kimaya Kids

Angular 22 kids fashion boutique and shopping portfolio built around the supplied Traditional collection. The interface uses cream, muted rose and warm gold, with dress photography as the focus.

## Local setup

Requires Node 24 and npm 11.

```bash
npm ci
npm start
```

Open the URL printed by Angular (normally http://localhost:4200).

## Checks

```bash
npm run build
npm test
npm run lint
npm run format:check
```

Every component has adjacent `.ts`, `.html`, `.css`, and `.spec.ts` files. Tests cover rendered navigation, product links, combined filters, wishlist toggles, cart removal, inventory limits, validated checkout, stock changes, product edits, deletion cleanup, design inquiries, HTTP errors/retry and the checkout guard.

## Structure

```text
src/app/
  core/
    data/             Initial demo catalogue
    models/           Product, bag, inquiry and order contracts
    services/         Signal store and HTTP catalogue service
    guards/           Empty-bag checkout redirect
    interceptors/     HTTP request timeout
  shared/
    components/       Navbar, footer, product card, loading skeleton
    forms/            Shared customer form behavior
  features/
    home/             Collection, search, style/colour filters, sorting
    product-details/  Routed gallery, sizes, stock and add-to-bag
    cart/             Quantities, removal and totals
    wishlist/         Saved products
    checkout/         Validated demo ordering and inventory recheck
    inquiry/          Custom design, contact and appointment forms
    admin/            Demo product CRUD, inventory, inquiries and orders
    about/            Brand introduction and gallery
    size-guide/       Illustrative measurement reference
    not-found/        Unmatched-route recovery
  app.routes.ts       Explicit lazy routes and page titles
```

Component-specific styles live beside each component. Global styles contain shared tokens, typography, layout primitives and common form styling. Components use OnPush; signals hold the cart, wishlist and filters. RxJS handles HTTP completion and request timeouts.

## Data and API boundary

`CatalogService` requests `/data/products.json` through Angular HttpClient, exposes loading/error state, rejects malformed responses and supports retry. This is a static mock HTTP endpoint, not a REST write backend. Browser-local product edits survive reloads. The initial seed also lets routed product pages resolve directly.

`Store` persists cart, wishlist, products, example inquiries and orders to localStorage. Checkout rechecks current inventory before saving an order and reducing stock. The guard redirects an empty bag to the cart. These are frontend safeguards, not server security.

## Assets

The 16 supplied PNGs are retained alongside optimized WebP files. The UI uses WebP; original total 41.3 MB becomes approximately 3.4 MB (92% smaller). Repeat views and catalogue boards belong to galleries for 10 Traditional products. Run `npm run images:optimize` after replacing images. Product photography is lazy loaded; the hero is prioritised.

## Routes

`/`, `/products/:id`, `/wishlist`, `/cart`, `/checkout`, `/custom`, `/appointment`, `/contact`, `/about`, `/size-guide`, `/admin`. Unknown paths show a 404 page. Each feature is lazy loaded.

## Honest demo boundaries

- Prices, fabric descriptions, stock and size measurements are illustrative and need owner verification.
- Checkout collects no money, sends no order and stores data only on this device.
- Demo Admin is intentionally public. Do not enter real customer information. A client-side admin password would not make this secure.
- WhatsApp opens a share composer. The owner's business number, Instagram profile and map location must be supplied before real launch.
- No invented testimonials or customer ratings are displayed.
- A production version needs server authentication/authorization, durable storage, server-side validation, inventory transactions, payment-provider callbacks and privacy/returns/shipping policies.

## Deployment and portfolio handoff

`vercel.json` includes the Angular build command, output directory and SPA fallback. Import this repository into Vercel, run the checks above and verify refreshes on nested routes. Source repository: [Samiksha530/kimaya-kids](https://github.com/Samiksha530/kimaya-kids) (public). Live demo: [kimaya-kids.vercel.app](https://kimaya-kids.vercel.app). Production deployment is READY. Add the verified live URL and screenshots after deployment; do not advertise unfinished functionality as production-ready.

The live storefront and product details were verified in the in-app browser, including a direct product-page refresh. A storefront screenshot was inspected. Full mobile/device and end-to-end checkout testing remain separate verification tasks.
