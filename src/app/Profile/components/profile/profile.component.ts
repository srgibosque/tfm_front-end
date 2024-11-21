import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { logout } from '../../../Auth/actions';
import { getProfile } from '../../actions';
import { Profile } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { ProfileState } from '../../reducers';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileData$?: Observable<ProfileState>

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getProfile());
    this.profileData$ = this.store.select('profileApp');
    console.log(this.profileData$);
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
