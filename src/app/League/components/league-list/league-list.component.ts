import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { League } from '../../models/league.interface';
import { Observable } from 'rxjs';
import { getProfile } from '../../../Profile/actions';
import { selectLeaguesData } from '../../../Profile/selectors/profile.selectors';
import { RouterModule } from '@angular/router';
import { NavigationCardComponent } from '../../../Shared/components/navigation-card/navigation-card.component';

@Component({
  selector: 'app-league-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationCardComponent],
  templateUrl: './league-list.component.html',
  styleUrl: './league-list.component.scss'
})
export class LeagueListComponent implements OnInit {
  leagueData$?: Observable<League[]>

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getProfile());
    this.leagueData$ = this.store.select(selectLeaguesData);
  }
}
