import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserDTO } from '../../models/user.dto';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { selectUserData } from '../../selectors/profile.selectors';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  name: UntypedFormControl;
  email: UntypedFormControl;
  gender: UntypedFormControl;
  birthdate: UntypedFormControl;
  editProfileForm: UntypedFormGroup;
  userData$: Observable<User>

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {

    this.name = new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ])

    this.email = new UntypedFormControl('', [
      Validators.required
    ]);

    this.gender = new UntypedFormControl('', [
      Validators.required,
    ]);

    this.birthdate = new UntypedFormControl('');

    this.editProfileForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      gender: this.gender,
      birthdate: this.birthdate,
    });

    this.userData$ = this.store.select(selectUserData)
  }

  ngOnInit(): void {
      this.userData$.subscribe((userData) => {
        if(userData){
          this.editProfileForm.patchValue({
            name: userData.name,
            email: userData.email,
            gender: userData.gender,
            birthdate: userData.birthdate
          });
        }
      })
  }

  edit(): void {
    
  }
}
