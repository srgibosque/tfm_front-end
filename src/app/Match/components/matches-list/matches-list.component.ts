import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Match } from '../../models/match.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { selectMatches, selectTeams } from '../../../League/selectors/league.selectors';
import { Team } from '../../../Team/models/team.interface';

@Component({
  selector: 'app-matches-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './matches-list.component.html',
  styleUrl: './matches-list.component.scss'
})
export class MatchesListComponent implements OnInit {
  matches$?: Observable<Match[]>;
  teams$?: Observable<Team[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.matches$ = this.store.select(selectMatches);
    this.teams$ = this.store.select(selectTeams);
  }

  getTeamName(teamId: number, teams: Team[]): string {
    return teams.find(team => team.id === teamId)?.name || 'Team name';
  }
}
