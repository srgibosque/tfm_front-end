import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { createLeague } from '../../actions';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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


  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.name = new FormControl('', [Validators.required]);
    this.location = new FormControl('', [Validators.required]);

    this.createLeagueForm = this.formBuilder.group({
      name: this.name,
      loaction: this.location
    });
  }

  createLeague() {
    if(this.createLeagueForm.valid){
      const { name, location } = this.createLeagueForm.value;
      this.store.dispatch(createLeague({
        name,
        location,
        teamIds: []
      }));
    }
  }

}
