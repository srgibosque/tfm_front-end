import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { first, mergeMap, Observable } from 'rxjs';
import { AuthState } from '../reducers';
import { logout } from '../actions';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('authApp').pipe(
      first(),
      mergeMap((response: AuthState) => {
        const token = response.credentials.token;

        if (token) {
          const decodedToken: any = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTime) {
            this.store.dispatch(logout());
            throw new Error('Token expired');
          }
        
          req = req.clone({
            setHeaders: {
              'Content-Type': 'application/json; charset=utf-8',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(req)
      })
    );
  }


}
