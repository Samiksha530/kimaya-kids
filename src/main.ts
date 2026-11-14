import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { requestTimeoutInterceptor } from './app/core/interceptors/request-timeout.interceptor';
bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([requestTimeoutInterceptor])),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
  ],
}).catch((error) => {
  document.body.textContent = 'Kimaya Kids could not start. Please refresh the page.';
  console.error(error);
});
