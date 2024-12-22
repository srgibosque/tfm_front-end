import { AuthEffects } from './Auth/effects/auth.effect';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';
import { environment } from '../environments/environment';
import { AuthInterceptorService } from './Auth/services/auth-interceptor.service';
import { ProfileEffects } from './Profile/effects/profile.effects';
import { TeamEffects } from './Team/effects/team.effects';
import { LeagueEffects } from './League/effects/league.effects';
import { MatchEffects } from './Match/effects/match.effects';
import { GlobalEffects } from './Shared/effects/global.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(appReducers),
    provideEffects(AuthEffects, ProfileEffects, TeamEffects, LeagueEffects, MatchEffects, GlobalEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
]
};
