import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { addTeamToLeague } from '../../actions';
import { FormControlComponent } from '../../../Shared/components/form-control/form-control.component';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormControlComponent],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.scss'
})
export class AddTeamComponent {
  addTeamForm: FormGroup;
  teamName: FormControl;

  constructor(private store: Store<AppState>,  private formBuilder: FormBuilder,) {
    this.teamName = new FormControl('', [Validators.required]);

    this.addTeamForm = this.formBuilder.group({
      teamName: this.teamName
    });
  }

  onSubmit() {
    if (this.addTeamForm.valid) {
      const { teamName } = this.addTeamForm.value;
      this.store.dispatch(addTeamToLeague({ teamName }));
      this.addTeamForm.reset();
    }
  }
}
