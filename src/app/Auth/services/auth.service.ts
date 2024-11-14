import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDTO } from '../models/auth.dto';
import { Observable } from 'rxjs';

interface AuthToken {
  userId: string;
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
}
