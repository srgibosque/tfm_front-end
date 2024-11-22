import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { logout } from '../../../Auth/actions';
import { getProfile } from '../../actions';
import { Profile } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { ProfileState } from '../../reducers';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { selectUserData } from '../../selectors/profile.selectors';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userData$?: Observable<User>

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getProfile());
    this.userData$ = this.store.select(selectUserData);
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
