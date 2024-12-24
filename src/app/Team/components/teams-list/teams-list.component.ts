import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/team.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { getProfile } from '../../../Profile/actions';
import { selectTeamsData } from '../../../Profile/selectors/profile.selectors';
import { RouterModule } from '@angular/router';
import { NavigationCardComponent } from '../../../Shared/components/navigation-card/navigation-card.component';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationCardComponent],
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.scss'
})
export class TeamsListComponent {
  teamData$?: Observable<Team[]>

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getProfile());
    this.teamData$ = this.store.select(selectTeamsData);
  }
}
