import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorsInterceptor } from './core/interceptor/errors.interceptor';
import { headersInterceptor } from './core/interceptor/headers.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch(),withInterceptors([errorsInterceptor,headersInterceptor,loadingInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom( NgxSpinnerModule )
  ]
};
