import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { Team } from '../../Team/models/team.interface';
import { League } from '../../League/models/league.interface';
import { Match } from '../../Match/models/match.interface';

export interface Profile {
  user: {
    userData: User;
    teams: Team[];
    leagues: League[];
    matches: Match[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'user';
    this.urlBlogUocApi = 'http://localhost:8080/' + this.controller;
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.urlBlogUocApi + '/profile');
  }

  updateProfile(updatedUser: User): Observable<{message: string, user: User}>{
    return this.http.put<{message: string, user: User}>(this.urlBlogUocApi + '/profile', updatedUser);
  }
}
