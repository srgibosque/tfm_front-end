import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { login } from '../../actions';
import { AuthDTO } from '../../models/auth.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
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
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginUser = new AuthDTO(null, '', '', '');

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
