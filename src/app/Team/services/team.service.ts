import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../Team/models/team.interface';
import { User } from '../../Profile/models/user.interface';
import { environment } from '../../../environments/environment';

export interface TeamResponse {
  message: string;
  team: Team;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  API_URL: string = environment.apiUrl;
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'team';
    this.urlApi = this.API_URL + this.controller;
  }

  getTeam(teamId: string): Observable<TeamResponse> {
    return this.http.get<TeamResponse>(this.urlApi + '/' + teamId);
  }

  getPlayerByEmail(email: string): Observable<{ message: string, user: User }> {
    return this.http.get<{ message: string, user: User }>(this.urlApi + '/player/' + email);
  }

  createTeam(teamData: {
    name: string,
    userTeamName: string,
    location: string,
    contactEmail: string,
    userIds: number[]
  }): Observable<{ message: string, team: Team }> {
    return this.http.post<{ message: string, team: Team }>(this.urlApi, teamData);
  }

  deleteTeam(teamId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.urlApi + '/' + teamId);
  }

  updateTeam(
    teamId: string,
    updatedTeam: { name: string, contactEmail: string, location: string, userIds: number[] }
  ): Observable<{ message: string, team: Team }> {
    return this.http.put<{ message: string, team: Team }>(this.urlApi + '/' + teamId, updatedTeam);
  }

}
