import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { LeagueTable } from '../../models/league-table.interface';
import { Observable } from 'rxjs';
import { Team } from '../../../Team/models/team.interface';
import { getLeagueTable } from '../../actions';
import { ActivatedRoute } from '@angular/router';
import { selectLeagueTable, selectTeams } from '../../selectors/league.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-league-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './league-table.component.html',
  styleUrl: './league-table.component.scss'
})
export class LeagueTableComponent implements OnInit {
  leagueTable$?: Observable<LeagueTable>;
  teams$?: Observable<Team[]>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const leagueId = this.route.parent?.snapshot.paramMap.get('leagueId');
    if (leagueId) {
      this.store.dispatch(getLeagueTable({ leagueId }));
      this.teams$ = this.store.select(selectTeams);
      this.leagueTable$ = this.store.select(selectLeagueTable);
    }
  }

  getTeamName(teamId: number, teams: Team[]): string {
    return teams.find(team => team.id === teamId)?.name || 'Team name';
  }
}
