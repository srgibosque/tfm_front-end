import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../models/league.interface';

export interface LeagueResponse {
  message: string;
  league: League;
}

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'league';
    this.urlBlogUocApi = 'http://localhost:8080/' + this.controller;
  }

  getLeague(leagueId: string): Observable<LeagueResponse> {
    return this.http.get<LeagueResponse>(this.urlBlogUocApi + '/' + leagueId);
  }
}