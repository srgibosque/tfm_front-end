import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../../../Profile/models/user.interface';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { createTeam, removePlayerToAdd } from '../../actions';
import { selectPlayersToAdd } from '../../selectors/team.selector';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.scss'
})
export class TeamFormComponent implements OnInit {
  name: FormControl;
  userTeamName: FormControl;
  contactEmail: FormControl;
  location: FormControl;
  createTeamForm: FormGroup;
  playersToAdd$: Observable<User[]>;

  isMoreOptionsShown: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.name = new FormControl('', [Validators.required]);
    this.userTeamName = new FormControl('', [Validators.required]);
    this.contactEmail = new FormControl('', [Validators.required]);
    this.location = new FormControl('', [Validators.required]);

    this.createTeamForm = this.formBuilder.group({
      name: this.name,
      userTeamName: this.userTeamName,
      contactEmail: this.contactEmail,
      location: this.location
    });

    this.playersToAdd$ = this.store.select(selectPlayersToAdd);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditMode = params['isEditMode'] === 'true';

      if (this.isEditMode) {
        this.createTeamForm.patchValue({
          name: params['name'],
          userTeamName: params['userteamname'],
          contactEmail: params['contactEmail'] || params['contact_email'],
          location: params['location']
        });
      }
    });
  }

  async createTeam() {
    if (this.createTeamForm.valid) {
      const { name, userTeamName, contactEmail, location } = this.createTeamForm.value;

      const players = await firstValueFrom(this.playersToAdd$);
      const userIds = players
        .map((player) => player.id)
        .filter((id): id is number => id !== undefined);

      this.store.dispatch(createTeam({
        name,
        userTeamName,
        contactEmail,
        location,
        userIds
      }));
    }
  }

  deleteFromPlayersToAdd(playerId: number) {
    this.store.dispatch(removePlayerToAdd({ playerId }));
  }

}
