import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { autoLogin } from './Auth/actions';
import { Observable } from 'rxjs';
import { selectIsLoading } from './Shared/selectors/shared.selector';
import { NavBarComponent } from './Shared/components/nav-bar/nav-bar.component';
import { SpinnerComponent } from './Shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Front-end';
  isLoading$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
    this.isLoading$ = this.store.select(selectIsLoading);
  };
}
