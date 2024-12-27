import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../models/league.interface';
import { LeagueTable } from '../models/league-table.interface';
import { Team } from '../../Team/models/team.interface';
import { Match } from '../../Match/models/match.interface';
import { environment } from '../../../environments/environment';

export interface LeagueResponse {
  message: string;
  league: League;
}

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  API_URL: string = environment.apiUrl;
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'league';
    this.urlApi = this.API_URL + this.controller;
  }

  getLeague(leagueId: string): Observable<LeagueResponse> {
    return this.http.get<LeagueResponse>(this.urlApi + '/' + leagueId);
  }

  getLeagueTable(leagueId: string): Observable<LeagueTable> {
    return this.http.get<LeagueTable>(this.urlApi + '/' + leagueId + '/table');
  }

  getTeamByTeamName(teamName: string): Observable<{ message: string, team: Team }> {
    return this.http.get<{ message: string, team: Team }>(this.urlApi + '/team/' + teamName);
  }

  createLeague(leagueData: { name: string, location: string, teamIds: number[] }): Observable<{ message: string, league: League, matches: Match[] }> {
    return this.http.post<{ message: string, league: League, matches: Match[] }>(this.urlApi, leagueData);
  }

  deleteLeague(leagueId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.urlApi + '/' + leagueId);
  }
}