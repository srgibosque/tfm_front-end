import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/team.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { deleteTeam, getTeam } from '../../actions';
import { CommonModule } from '@angular/common';
import { MoreOptionsModalComponent } from '../../../Shared/components/more-options-modal/more-options-modal.component';
import { PlayerCardComponent } from '../../../Shared/components/player-card/player-card.component';
import { NavBackComponent } from '../../../Shared/components/nav-back/nav-back.component';
import { BadgeComponent } from '../../../Shared/components/badge/badge.component';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MoreOptionsModalComponent, PlayerCardComponent, NavBackComponent, BadgeComponent],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.scss'
})
export class TeamDetailComponent implements OnInit {
  team$?: Observable<Team>;
  isMoreOptionsShown: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId');
    if (teamId) {
      this.store.dispatch(getTeam({ teamId }));
      this.team$ = this.store.select((state) => state.teamApp.team);
    }
  }

  closeMoreOptions() {
    this.isMoreOptionsShown = false;
  }

  deleteTeam(id: number) {
    if (id) {
      const teamId = id.toString();
      this.store.dispatch(deleteTeam({ teamId }));
    }
  }

  updateTeam(team: Team) {
    this.router.navigate(['/my-teams/team-form'], {
      queryParams: {
        isEditMode: true,
        ...team,
        players: JSON.stringify(team.Users)
      }
    })
  }
}
