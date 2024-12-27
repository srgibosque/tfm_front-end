import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../../Match/models/match.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  API_URL: string = environment.apiUrl;
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'match';
    this.urlApi = this.API_URL + this.controller;
  }

  getMatch(matchId: string): Observable<{message: string, match: Match}> {
    return this.http.get<{message: string, match: Match}>(this.urlApi + '/' + matchId);
  }

  updateMatch(matchId: string, updatedMatch: Match): Observable<{message: string, match: Match}>{
    return this.http.put<{message: string, match: Match}>(this.urlApi + '/' + matchId, updatedMatch);
  }
}
