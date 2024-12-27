import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDTO } from '../models/auth.dto';
import { Observable } from 'rxjs';
import { UserDTO } from '../../Profile/models/user.dto';
import { environment } from '../../../environments/environment';

interface AuthToken {
  userId: number;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL:string = environment.apiUrl;
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'auth';
    this.urlApi = this.API_URL + this.controller;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.urlApi + '/signin', auth);
  }

  signup(user: UserDTO): Observable<{message: string}>{
    return this.http.put<{message: string}>(this.urlApi + '/signup', user);
  }
}
