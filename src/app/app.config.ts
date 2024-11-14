import { AuthEffects } from './Auth/effects/auth.effect';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(appReducers),
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production })
]
};
