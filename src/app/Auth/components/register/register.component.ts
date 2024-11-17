import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Router } from '@angular/router';
import { UserDTO } from '../../../Profile/models/user.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpUser: UserDTO;
  name: UntypedFormControl;
  email: UntypedFormControl;
  password: UntypedFormControl;
  gender: UntypedFormControl;
  birthdate: UntypedFormControl;
  signUpForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.signUpUser = new UserDTO(null, '', '', '', undefined, null);

    this.name = new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ])

    this.email = new UntypedFormControl('', [
      Validators.required
    ]);

    this.password = new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(36),
    ]);

    this.gender = new UntypedFormControl('', [
      Validators.required,
    ]);

    this.birthdate = new UntypedFormControl('');

    this.signUpForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      gender: this.gender,
      birthdate: this.birthdate,
    });
  }

  signUp(): void {

  }

  toLogIn(): void {
    this.router.navigate(['/login']);
  }
}
