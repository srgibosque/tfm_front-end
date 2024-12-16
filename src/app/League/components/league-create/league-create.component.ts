import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { createLeague } from '../../actions';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';
import { Team } from '../../../Team/models/team.interface';
import { selectTeamsToAdd } from '../../selectors/league.selectors';

@Component({
  selector: 'app-league-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './league-create.component.html',
  styleUrl: './league-create.component.scss'
})
export class LeagueCreateComponent {
  name: FormControl;
  location: FormControl;
  createLeagueForm: FormGroup;
  teamsToAdd$: Observable<Team[]>

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.name = new FormControl('', [Validators.required]);
    this.location = new FormControl('', [Validators.required]);

    this.createLeagueForm = this.formBuilder.group({
      name: this.name,
      location: this.location
    });

    this.teamsToAdd$ = this.store.select(selectTeamsToAdd);
  }

  async createLeague() {
    if (this.createLeagueForm.valid) {
      const { name, location } = this.createLeagueForm.value;

      const teams = await firstValueFrom(this.teamsToAdd$);
      const teamIds = teams
        .map((team) => team.id)
        .filter((id): id is number => id !== undefined);

      this.store.dispatch(createLeague({
        name,
        location,
        teamIds
      }));

    }
  }
}


