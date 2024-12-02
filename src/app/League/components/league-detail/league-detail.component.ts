import { Component, OnInit } from '@angular/core';
import { League } from '../../models/league.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLinkActive, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { getLeague } from '../../actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-league-detail',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './league-detail.component.html',
  styleUrl: './league-detail.component.scss'
})
export class LeagueDetailComponent implements OnInit{
  league$?: Observable<League>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>){}

  ngOnInit(): void {
    const leagueId = this.route.snapshot.paramMap.get('leagueId');
    if (leagueId) {
      this.store.dispatch(getLeague({leagueId}));
      this.league$ = this.store.select((state) => state.leagueApp.league);
    }
  }

}
