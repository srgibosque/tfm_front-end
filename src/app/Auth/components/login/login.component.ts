import { Component } from '@angular/core';
import { AuthDTO } from '../../models/auth.dto';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { login } from '../../actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginUser: AuthDTO;
  email: UntypedFormControl;
  password: UntypedFormControl;
  loginForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store<AppState>
  ) {
    this.loginUser = new AuthDTO('', '', '', '');

    this.email = new UntypedFormControl('', [
      Validators.required
    ]);

    this.password = new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(36),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  login(): void {
    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.store.dispatch(login({email: this.loginUser.email, password: this.loginUser.password}));
  }

}
