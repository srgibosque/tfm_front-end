import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { Team } from '../../Team/models/team.interface';
import { League } from '../../League/models/league.interface';
import { Match } from '../../Match/models/match.interface';
import { environment } from '../../../environments/environment';

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
  API_URL: string = environment.apiUrl;
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'user';
    this.urlApi = this.API_URL + this.controller;
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.urlApi + '/profile');
  }

  updateProfile(updatedUser: User): Observable<{message: string, user: User}>{
    return this.http.put<{message: string, user: User}>(this.urlApi + '/profile', updatedUser);
  }
}
