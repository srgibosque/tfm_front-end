import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { login } from '../../actions';
import { AuthDTO } from '../../models/auth.dto';
import { FormControlComponent } from '../../../Shared/components/form-control/form-control.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormControlComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.loginUser = new AuthDTO(null, '', '', '');

    this.email = new FormControl('', [
      Validators.required
    ]);

    this.password = new FormControl('', [
      Validators.required
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
