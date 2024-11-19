import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDTO } from '../models/auth.dto';
import { Observable } from 'rxjs';
import { UserDTO } from '../../Profile/models/user.dto';

interface AuthToken {
  userId: number;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'auth';
    this.urlBlogUocApi = 'http://localhost:8080/' + this.controller;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.urlBlogUocApi + '/signin', auth);
  }

  signup(user: UserDTO): Observable<{message: string}>{
    return this.http.put<{message: string}>(this.urlBlogUocApi + '/signup', user);
  }
}
