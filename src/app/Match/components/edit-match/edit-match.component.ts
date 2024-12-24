import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Match } from '../../models/match.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { DateFormattingService } from '../../../Shared/services/date-formatting.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { getMatch, updateMatch } from '../../actions';
import { NavBackComponent } from '../../../Shared/components/nav-back/nav-back.component';
import { FormControlComponent } from '../../../Shared/components/form-control/form-control.component';

@Component({
  selector: 'app-edit-match',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NavBackComponent, FormControlComponent],
  templateUrl: './edit-match.component.html',
  styleUrl: './edit-match.component.scss'
})
export class EditMatchComponent implements OnInit {
  date: FormControl;
  location: FormControl;
  homeTeamGoals: FormControl;
  awayTeamGoals: FormControl;
  editMatchForm: FormGroup;
  matchData$?: Observable<Match | undefined>;
  leagueId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private dateFormattingService: DateFormattingService
  ) {

    this.date = new FormControl('')
    this.location = new FormControl('');
    this.homeTeamGoals = new FormControl('');
    this.awayTeamGoals = new FormControl('');

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
}
