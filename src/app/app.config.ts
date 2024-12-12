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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfileEffects } from './Profile/effects/profile.effects';
import { AuthInterceptorService } from './Auth/services/auth-interceptor.service';
import { TeamEffects } from './Team/effects/team.effects';
import { LeagueEffects } from './League/effects/league.effects';
import { MatchEffects } from './Match/effects/match.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(appReducers),
    provideEffects(AuthEffects, ProfileEffects, TeamEffects, LeagueEffects, MatchEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
]
};
