import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { addPlayerToTeam } from '../../actions';
import { FormControlComponent } from '../../../Shared/components/form-control/form-control.component';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormControlComponent],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.scss'
})
export class AddPlayerComponent {
  addPlayerForm: FormGroup;
  email: FormControl;

  constructor(
    private store: Store<AppState>, 
    private formBuilder: FormBuilder
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.addPlayerForm = this.formBuilder.group({
      email: this.email
    });
  }

  onSubmit() {
    if (this.addPlayerForm.valid) {
      const { email } = this.addPlayerForm.value;
      this.store.dispatch(addPlayerToTeam({ email }));
      this.addPlayerForm.reset();
    }
  }
}
