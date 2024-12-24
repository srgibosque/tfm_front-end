import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { createLeague, removeTeamToAdd } from '../../actions';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';
import { Team } from '../../../Team/models/team.interface';
import { selectTeamsToAdd } from '../../selectors/league.selectors';
import { FormControlComponent } from '../../../Shared/components/form-control/form-control.component';
import { NavBackComponent } from '../../../Shared/components/nav-back/nav-back.component';

@Component({
  selector: 'app-league-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormControlComponent, NavBackComponent],
  templateUrl: './league-create.component.html',
  styleUrl: './league-create.component.scss'
})
export class LeagueCreateComponent {
  name: FormControl;
  location: FormControl;
  createLeagueForm: FormGroup;
  teamsToAdd$: Observable<Team[]>;
  isMoreOptionsShown: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.name = new FormControl('', [Validators.required]);
    this.location = new FormControl('', [Validators.required, Validators.maxLength(80)]);

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

  deleteFromTeamsToAdd(teamId: number){
    this.store.dispatch(removeTeamToAdd({ teamId }));
  }
}


