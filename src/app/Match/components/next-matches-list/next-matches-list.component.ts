import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { getProfile } from '../../../Profile/actions';
import { Match } from '../../models/match.interface';
import { map, Observable } from 'rxjs';
import { selectMacthData } from '../../../Profile/selectors/profile.selectors';
import { MatchCardComponent } from '../match-card/match-card.component';

@Component({
  selector: 'app-next-matches-list',
  standalone: true,
  imports: [MatchCardComponent, CommonModule],
  templateUrl: './next-matches-list.component.html',
  styleUrl: './next-matches-list.component.scss'
})
export class NextMatchesListComponent implements OnInit {
  matches$?: Observable<Match[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getProfile());
    this.matches$ = this.store.select(selectMacthData).pipe(
      map(matches => matches
        .filter(match => match.date && new Date(match.date) > new Date())
        .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
      )
    );
  }

}
