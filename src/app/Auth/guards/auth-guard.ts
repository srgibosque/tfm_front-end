import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);

  return store.select('authApp').pipe(
    map((authResponse) => {

      const token = authResponse.credentials.token;

      if (token) {
        return true;

      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
}
