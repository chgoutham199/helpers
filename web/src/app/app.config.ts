import { CookieService } from 'ngx-cookie-service';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [CookieService,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),provideHttpClient(withInterceptorsFromDi()),{provide:HTTP_INTERCEPTORS, useClass:loadingInterceptor, multi:true},    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
};
