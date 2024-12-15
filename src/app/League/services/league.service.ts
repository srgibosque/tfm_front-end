import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../models/league.interface';
import { LeagueTable } from '../models/league-table.interface';
import { Team } from '../../Team/models/team.interface';
import { Match } from '../../Match/models/match.interface';

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

  getLeagueTable(leagueId: string): Observable<LeagueTable> {
    return this.http.get<LeagueTable>(this.urlBlogUocApi + '/' + leagueId + '/table');
  }

  getTeamByTeamName(teamName: string): Observable<{ message: string, team: Team }> {
    return this.http.get<{ message: string, team: Team }>(this.urlBlogUocApi + '/team/' + teamName);
  }

  createLeague(leagueData: { name: string, location: string, teamIds: number[] }): Observable<{ message: string, league: League, matches: Match[] }> {
    return this.http.post<{ message: string, league: League, matches: Match[] }>(this.urlBlogUocApi, leagueData);
  }
}