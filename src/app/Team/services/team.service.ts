import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../Team/models/team.interface';
import { User } from '../../Profile/models/user.interface';

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

  getPlayerByEmail(email: string): Observable<{ message: string, user: User }> {
    return this.http.get<{ message: string, user: User }>(this.urlBlogUocApi + '/player/' + email);
  }

  createTeam(teamData: {
    name: string,
    userTeamName: string,
    location: string,
    contactEmail: string,
    userIds: number[]
  }): Observable<{ message: string, team: Team }> {
    return this.http.post<{ message: string, team: Team }>(this.urlBlogUocApi, teamData);
  }

  deleteTeam(teamId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.urlBlogUocApi + '/' + teamId);
  }

  updateTeam(
    teamId: string,
    updatedTeam: { name: string, contactEmail: string, location: string, userIds: number[] }
  ): Observable<{ message: string, team: Team }> {
    return this.http.put<{ message: string, team: Team }>(this.urlBlogUocApi + '/' + teamId, updatedTeam);
  }

}
