import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Match } from '../../models/match.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { DateFormattingService } from '../../../Shared/services/date-formatting.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { getMatch, updateMatch } from '../../actions';

@Component({
  selector: 'app-edit-match',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './edit-match.component.html',
  styleUrl: './edit-match.component.scss'
})
export class EditMatchComponent implements OnInit {
  date: UntypedFormControl;
  location: UntypedFormControl;
  homeTeamGoals: UntypedFormControl;
  awayTeamGoals: UntypedFormControl;
  editMatchForm: UntypedFormGroup;
  matchData$?: Observable<Match | undefined>;
  leagueId?: number;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private dateFormattingService: DateFormattingService
  ) {

    this.date = new UntypedFormControl('')
    this.location = new UntypedFormControl('');
    this.homeTeamGoals = new UntypedFormControl('');
    this.awayTeamGoals = new UntypedFormControl('');

    this.editMatchForm = this.formBuilder.group({
      date: this.date,
      location: this.location,
      homeTeamGoals: this.homeTeamGoals,
      awayTeamGoals: this.awayTeamGoals,
    });

  }

  ngOnInit(): void {
    const matchId = this.route.snapshot.paramMap.get('matchId');
    if (matchId) {
      this.store.dispatch(getMatch({ matchId }));
      this.matchData$ = this.store.select((state) => state.matchApp.match);

      if (this.matchData$) {
        this.matchData$.subscribe((matchData) => {
          this.leagueId = matchData?.leagueId;
          if (matchData) {
            this.editMatchForm.patchValue({
              location: matchData.location,
              homeTeamGoals: matchData.homeTeamGoals,
              awayTeamGoals: matchData.awayTeamGoals,
              date: this.dateFormattingService.formatDateAndHourToInput(matchData.date),
            });
          }
        })
      }
    }
  }

  editMatch(): void {
    const formValues = this.editMatchForm.value;
    const matchId = this.route.snapshot.paramMap.get('matchId');

    if (matchId) {
      this.store.dispatch(updateMatch({
        matchId,
        date: formValues.date,
        location: formValues.location,
        homeTeamGoals: formValues.homeTeamGoals,
        awayTeamGoals: formValues.awayTeamGoals,
      }));
    }
  }

  goToLeague() {
    this.router.navigate(['/my-leagues', this.leagueId]);
  }
}
