import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Router, RouterModule } from '@angular/router';
import { UserDTO } from '../../../Profile/models/user.dto';
import { signup } from '../../actions';
import { FormControlComponent } from '../../../Shared/components/form-control/form-control.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormControlComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpUser: UserDTO;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  gender: FormControl;
  birthdate: FormControl;
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.signUpUser = new UserDTO(undefined, '', '', '', undefined, null);

    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ])

    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(36),
    ]);

    this.gender = new FormControl('', [
      Validators.required,
    ]);

    this.birthdate = new FormControl('', [
      Validators.required,
    ]);

    this.signUpForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      gender: this.gender,
      birthdate: this.birthdate,
    });
  }

  signUp(): void {
    this.signUpUser.email = this.email.value;
    this.signUpUser.name = this.name.value;
    this.signUpUser.password = this.password.value;
    this.signUpUser.gender = this.gender.value;
    this.signUpUser.birthdate = this.birthdate.value;

    this.store.dispatch(signup({
      email: this.signUpUser.email,
      name: this.signUpUser.name,
      gender: this.signUpUser.gender,
      birthdate: this.signUpUser.birthdate,
      password: this.signUpUser.password
    }));
  }
}
