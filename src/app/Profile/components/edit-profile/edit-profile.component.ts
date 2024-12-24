import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { selectUserData } from '../../selectors/profile.selectors';
import { DateFormattingService } from '../../../Shared/services/date-formatting.service';
import { updateProfile } from '../../actions';
import { FormControlComponent } from '../../../Shared/components/form-control/form-control.component';
import { NavBackComponent } from '../../../Shared/components/nav-back/nav-back.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormControlComponent, NavBackComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  name: FormControl;
  email: FormControl;
  gender: FormControl;
  birthdate: FormControl;
  editProfileForm: FormGroup;
  userData$: Observable<User>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private dateFormattingService: DateFormattingService
  ) {

    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ])

    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.gender = new FormControl('', [
      Validators.required,
    ]);

    this.birthdate = new FormControl('', [
      Validators.required,
    ]);

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
      if (userData) {

        this.editProfileForm.patchValue({
          name: userData.name,
          email: userData.email,
          gender: userData.gender,
          birthdate: this.dateFormattingService.formatDateToInput(userData.birthdate),
        });
      }
    })
  }

  edit(): void {
    const formValues = this.editProfileForm.value;
    this.store.dispatch(updateProfile({
      name: formValues.name,
      email: formValues.email,
      gender: formValues.gender,
      birthdate: formValues.birthdate,
    }));
  }
  
}
