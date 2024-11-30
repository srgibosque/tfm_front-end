import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/team.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { getTeam } from '../../actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.scss'
})
export class TeamDetailComponent implements OnInit {
  team$?: Observable<Team>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit():  void {
    const teamId = this.route.snapshot.paramMap.get('teamId');
    if (teamId) {
      this.store.dispatch(getTeam({teamId}));
      this.team$ = this.store.select((state) => state.teamApp.team);
    }
  }
}
