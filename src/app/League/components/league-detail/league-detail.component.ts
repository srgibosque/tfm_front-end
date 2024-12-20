import { Component, OnInit } from '@angular/core';
import { League } from '../../models/league.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLinkActive, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { deleteLeague, getLeague } from '../../actions';
import { CommonModule } from '@angular/common';
import { MoreOptionsModalComponent } from '../../../Shared/components/more-options-modal/more-options-modal.component';

@Component({
  selector: 'app-league-detail',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, CommonModule, MoreOptionsModalComponent],
  templateUrl: './league-detail.component.html',
  styleUrl: './league-detail.component.scss'
})
export class LeagueDetailComponent implements OnInit {
  league$?: Observable<League>;
  isMoreOptionsShown: boolean = false;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    const leagueId = this.route.snapshot.paramMap.get('leagueId');
    if (leagueId) {
      this.store.dispatch(getLeague({ leagueId }));
      this.league$ = this.store.select((state) => state.leagueApp.league);
    }
  }

  closeMoreOptions() {
    this.isMoreOptionsShown = false;
  }

  deleteLeague(id: number) {
    if(id){
      const leagueId = id.toString();
      this.store.dispatch(deleteLeague({leagueId}));
    }
  }
}
