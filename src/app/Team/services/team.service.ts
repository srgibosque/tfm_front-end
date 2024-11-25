import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../Team/models/team.interface';

export interface TeamResponse {
  message: string;
  team: Team;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'team';
    this.urlBlogUocApi = 'http://localhost:8080/' + this.controller;
  }

  getTeam(teamId: string): Observable<TeamResponse> {
    return this.http.get<TeamResponse>(this.urlBlogUocApi + '/' + teamId);
  }
}
