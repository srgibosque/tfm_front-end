import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../../Match/models/match.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'match';
    this.urlBlogUocApi = 'http://localhost:8080/' + this.controller;
  }

  getMatch(matchId: string): Observable<{message: string, match: Match}> {
    return this.http.get<{message: string, match: Match}>(this.urlBlogUocApi + '/' + matchId);
  }

  updateMatch(matchId: string, updatedMatch: Match): Observable<{message: string, match: Match}>{
    return this.http.put<{message: string, match: Match}>(this.urlBlogUocApi + '/' + matchId, updatedMatch);
  }
}
