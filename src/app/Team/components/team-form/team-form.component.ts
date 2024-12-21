import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../../../Profile/models/user.interface';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { createTeam, loadPlayersToAdd, removePlayerToAdd, updateTeam } from '../../actions';
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
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.name = new FormControl('', [Validators.required]);
    this.userTeamName = new FormControl(
      { value: '', disabled: this.isEditMode },
      [Validators.required]
    );
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
        this.userTeamName.disable();
        this.createTeamForm.patchValue({
          name: params['name'],
          userTeamName: params['userteamname'],
          contactEmail: params['contact_email'],
          location: params['location']
        });

        const players = params['players'] ? JSON.parse(params['players']) : [];
        this.store.dispatch(loadPlayersToAdd({ players }));
      } else {
        this.userTeamName.enable();
      }
    });
  }

  async submitForm() {
    console.log('Form Submitted. Is Edit Mode:', this.isEditMode);
    if (this.createTeamForm.valid) {
      const { name, userTeamName, contactEmail, location } = this.createTeamForm.value;

      const players = await firstValueFrom(this.playersToAdd$);
      const userIds = players
        .map((player) => player.id)
        .filter((id): id is number => id !== undefined);

      if (this.isEditMode) {
        this.store.dispatch(updateTeam({
          teamId: this.route.snapshot.queryParamMap.get('id')!,
          name,
          contactEmail,
          location,
          userIds
        }))
      } else {
        this.store.dispatch(createTeam({
          name,
          userTeamName,
          contactEmail,
          location,
          userIds
        }));
      }

    }
  }

  deleteFromPlayersToAdd(playerId: number) {
    this.store.dispatch(removePlayerToAdd({ playerId }));
  }

  navigateToAddPlayer(): void {
    this.router.navigate(['add-player'], {
      relativeTo: this.route,
      queryParams: this.route.snapshot.queryParams,
      queryParamsHandling: 'merge' 
    });
  }

}
