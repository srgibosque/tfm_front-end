import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { logout } from '../../../Auth/actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
